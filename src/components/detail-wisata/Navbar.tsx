import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="py-4 px-4 md:px-16 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center">
        <Image
          src="/images/logo-wistara.png"
          alt="Wistara Logo"
          width={100}
          height={100}
          className="h-10 object-contain"
        />
        <div className="ml-4 relative">
          <input
            type="text"
            placeholder="Cari destinasi wisata..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 py-2 px-4 pl-10 rounded-full w-64 md:w-80 focus:outline-none"
          />
          <div className="absolute left-3 top-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="hidden md:flex space-x-8">
        <Link
          href="/main/home"
          className="text-blue-950 hover:text-blue-800 font-medium"
        >
          Beranda
        </Link>
        <Link href="/main/about" className="text-blue-950 hover:text-blue-800">
          Tentang kami
        </Link>
        <Link
          href="/main/personal"
          className="text-blue-950 hover:text-blue-800"
        >
          Personalisasi
        </Link>
        <Link
          href="/main/favorit"
          className="text-blue-950 hover:text-blue-800"
        >
          Favorit
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/main/profile">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
