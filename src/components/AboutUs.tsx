"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function About() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="py-4 px-4 md:px-16 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center">
          <Image
            src="/images/logo-wistara.png"
            alt="Wistara Logo"
            width={40}
            height={40}
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
            className="text-blue-950 hover:text-blue-800 "
          >
            Beranda
          </Link>
          <Link
            href="/main/about"
            className="text-blue-950 hover:text-blue-800 font-medium"
          >
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

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        {/* Judul Halaman */}
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-950">
          Tentang Kami
        </h1>

        {/* Deskripsi Tentang Wistara */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            Wistara adalah platform yang didedikasikan untuk mempromosikan
            keindahan dan kekayaan budaya Indonesia. Kami hadir untuk membantu
            wisatawan lokal maupun internasional menemukan destinasi wisata
            terbaik di Indonesia.
          </p>
        </div>

        {/* Visi dan Misi */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-blue-950">Visi</h2>
            <p className="text-gray-700">
              Menjadi platform terdepan dalam mempromosikan destinasi wisata
              Indonesia yang berkelanjutan dan ramah lingkungan.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-blue-950">Misi</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Menyediakan informasi lengkap tentang destinasi wisata
                Indonesia.
              </li>
              <li>
                Mendorong pariwisata yang ramah lingkungan dan berkelanjutan.
              </li>
              <li>
                Meningkatkan kesadaran akan kekayaan budaya dan alam Indonesia.
              </li>
            </ul>
          </div>
        </div>

        {/* Tim Kami */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12 text-blue-950">Tim Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Andi Muhammad Qismat Rajjab", role: "UI/UX Designer" },
              { name: "Misbah Fauzi Akshari Lopa", role: "UI/UX Designer" },
              { name: "Faris Hazim Supriyadi", role: "Frontend Developer" },
              { name: "Muh Khiyarul Gulam", role: "Backend Developer" },

              {
                name: "Syarifah Alya Alhasni",
                role: "Machine Learning Engineer",
              },
              {
                name: "Muhammad Faisal Aktsa",
                role: "Machine Learning Engineer",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-2xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action with Bromo background */}
        <div className="relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: 'url("/images/bromo.png")',
              filter: "brightness(0.7)",
            }}
          />
          <div className="relative z-10 text-center py-16 px-8">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Bergabunglah Bersama Kami
            </h2>
            <p className="text-gray-100 mb-8 text-lg max-w-2xl mx-auto">
              Tertarik untuk menjelajahi Indonesia bersama Wistara? Mulai
              petualangan Anda sekarang!
            </p>
            <Link
              href="/main/search"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg font-medium"
            >
              Jelajahi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
