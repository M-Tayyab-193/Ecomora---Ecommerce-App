import Stripe from "stripe";
import connectDB from "@/config/db";
import User from "@/models/User";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const handlePaymentIntent = async (paymentIntentId, isPaid) => {
      const session = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId, userId } = session.data[0].metadata;

      await connectDB();

      if (isPaid) {
        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        await User.findByIdAndUpdate(userId, { cartItems: {} });
      } else {
        await Order.findByIdAndUpdate(orderId);
      }
    };
    switch (event.type) {
      case "payment_intent.succeeded":
        {
          await handlePaymentIntent(event.data.object.id, true);
        }

        break;
      case "payment_intent.canceled":
        {
          await handlePaymentIntent(event.data.object.id, false);
        }
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(`Error handling Stripe webhook: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
