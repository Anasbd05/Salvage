"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center sticky z-50 backdrop-blur-md mt-4 justify-between border-b border-sky-200 py-4 px-4 lg:px-18 mx-2 lg:mx-8 rounded-lg shadow-md">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu size={25} className="hover:text-neutral-800" />
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-12 items-center">
          <Link
            className="font-semibold cursor-pointer hover:text-neutral-800 "
            href={"#features"}
          >
            Activite
          </Link>
          <Link
            className="font-semibold cursor-pointer hover:text-neutral-800 "
            href={"#works"}
          >
            Portfolio
          </Link>
          <Link
            className="font-semibold cursor-pointer hover:text-neutral-800 "
            href={"#reviews"}
          >
            Reviews
          </Link>
        </div>

        {/* Logo */}
        <main className="flex items-center">
          <Image
            src={logo}
            alt=""
            width={70}
            height={70}
            className=" rounded-full -mr-2 "
          />
          <span className="font-bold text-xl font-header text-accent ">
            SALVAGE
          </span>
        </main>

        {/* Desktop right section */}
        <div className="hidden md:flex items-center gap-12">
          <Link
            href={"/demande"}
            className=" py-2 px-5 bg-accent text-white hover:opacity-80 cursor-pointer rounded-md "
          >
            Demande
          </Link>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/40 md:hidden">
          <div className="w-64 bg-white shadow-lg p-6 py-10 space-y-6 relative">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={20} />
            </button>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="block font-semibold hover:text-neutral-800"
              href={"#features"}
            >
              Activite
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="block font-semibold hover:text-neutral-800"
              href={"#works"}
            >
              Portfolio
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="block font-semibold hover:text-neutral-800"
              href={"#reviews"}
            >
              Reviews
            </Link>
            <Link
              href={"/demande"}
              className=" py-2 px-8 bg-accent text-white hover:opacity-80 cursor-pointer rounded-md "
            >
              Demande
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
