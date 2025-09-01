import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { role } = req.body;

  // only allow "seller" upgrade through this route
  if (role !== "seller") {
    return res.status(400).json({ error: "Invalid role change" });
  }

  await connectDB();
  await User.findByIdAndUpdate(userId, { role });

  await clerkClient.users.updateUser(userId, {
    publicMetadata: { role },
  });

  return res.json({ success: true, role });
}
