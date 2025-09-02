import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full max-sm:px-4 sm:px-10">
      <div className="flex items-center justify-center gap-4 w-full">
        <Image className="hidden md:block mb-2" src={assets.logo} alt="logo" />
        <p className="hidden md:block h-7 w-[1px] bg-gray-600"></p>
        <p className="py-4 text-center max-sm:text-sm text-[16px] mb-1">
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
      </div>
    </div>
  );
};

export default Footer;
