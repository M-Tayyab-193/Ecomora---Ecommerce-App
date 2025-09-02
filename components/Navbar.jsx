"use client";
import React, { useState } from "react";
import { assets, CartIcon, BagIcon, HomeIcon, BoxIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";
import BecomeSeller from "@/components/BecomeSeller"; // Import the modal

const Navbar = () => {
  const { isSeller, setIsSeller, router, user, getToken } = useAppContext();
  const { openSignIn } = useClerk();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBecomeSellerSubmit = async (sellerData) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/upgrade-role",
        {
          role: "seller",
          sellerProfile: sellerData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("data", data);
      if (data.success) {
        setIsSeller(true);
        toast.success("Welcome to our seller community!");
      } else {
        toast.error(data.message || "Failed to become a seller");
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.error("Error upgrading to seller:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        <Image
          className="cursor-pointer w-28 md:w-36"
          onClick={() => router.push("/")}
          src={assets.logo}
          alt="logo"
        />
        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-gray-900 transition">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gray-900 transition">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-gray-900 transition">
            Contact
          </Link>

          {user && isSeller ? (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full hover:border hover:border-orange-500 hover:text-black transition-all ease-in-out"
            >
              Seller Dashboard
            </button>
          ) : (
            user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs border px-4 py-1.5 rounded-full hover:border hover:border-orange-500 hover:text-black transition-all ease-in-out"
              >
                Become a seller
              </button>
            )
          )}
        </div>

        <ul className="hidden md:flex items-center gap-4 ">
          <Image
            className="w-4 h-4"
            src={assets.search_icon}
            alt="search icon"
          />
          {user ? (
            <>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Cart"
                    labelIcon={<CartIcon />}
                    onClick={() => router.push("/cart")}
                  />
                </UserButton.MenuItems>

                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={<BagIcon />}
                    onClick={() => router.push("/my-orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </>
          ) : (
            <button
              className="flex items-center gap-2 hover:text-gray-900 transition"
              onClick={openSignIn}
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </ul>

        <div className="flex items-center md:hidden gap-3">
          {user && isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
          {user ? (
            <>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Home"
                    labelIcon={<HomeIcon />}
                    onClick={() => router.push("/")}
                  />
                </UserButton.MenuItems>

                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Products"
                    labelIcon={<BoxIcon />}
                    onClick={() => router.push("/all-products")}
                  />
                </UserButton.MenuItems>

                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Cart"
                    labelIcon={<CartIcon />}
                    onClick={() => router.push("/cart")}
                  />
                </UserButton.MenuItems>

                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={<BagIcon />}
                    onClick={() => router.push("/my-orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </>
          ) : (
            <button
              className="flex items-center gap-2 hover:text-gray-900 transition"
              onClick={openSignIn}
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          )}
        </div>
      </nav>

      {/* Become Seller Modal */}
      <BecomeSeller
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBecomeSellerSubmit}
      />
    </>
  );
};

export default Navbar;
