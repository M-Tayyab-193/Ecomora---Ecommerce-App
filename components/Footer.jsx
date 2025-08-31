import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            Ecomora is a user-friendly online shopping platform where you can
            easily browse products, add items to your cart, and place orders.
            With a clean design and simple navigation, Ecomora makes buying and
            selling products fast, secure, and enjoyable for everyone.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="about">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="contact">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="privacy-policy">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+92-343-8582328</p>
              <p>m.tayyab.92.work@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright © 2025{" "}
        <a
          className="mx-3 tracking-wide hover:underline hover:text-black"
          href="https://wa.link/vkxlid"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-blue-600">@</span>mtayyab193
        </a>{" "}
        All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
