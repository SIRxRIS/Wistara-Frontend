"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Preferences {
  destinationType: string;
  budget: string;
  duration: string;
  travelStyle: string;
  groupSize: string;
}

const Personal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [preferences, setPreferences] = useState<Preferences>({
    destinationType: "",
    budget: "",
    duration: "",
    travelStyle: "",
    groupSize: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Preferensi Pengguna:", preferences);
    alert(
      "Terima kasih! Kami akan menampilkan rekomendasi destinasi untuk Anda."
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="py-4 px-4 md:px-16 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center">
          <img
            src="/images/logo-wistara.png"
            alt="Wistara Logo"
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
            className="text-blue-950 hover:text-blue-800 "
          >
            Tentang kami
          </Link>
          <Link
            href="/main/personal"
            className="text-blue-950 hover:text-blue-800 font-medium"
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
              <img
                src="/images/profile.png"
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        {/* Judul Halaman */}
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-950">
          Personalisasi Destinasi
        </h1>

        {/* Deskripsi */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            Dapatkan rekomendasi destinasi wisata terbaik di Indonesia
            berdasarkan preferensi Anda. Isi formulir di bawah ini dan biarkan
            Wistara membantu Anda merencanakan petualangan impian!
          </p>
        </div>

        {/* Form Personalisasi */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          {/* Jenis Destinasi */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="destinationType"
            >
              Jenis Destinasi
            </label>
            <select
              id="destinationType"
              name="destinationType"
              value={preferences.destinationType}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Pilih jenis destinasi
              </option>
              <option value="budaya">Budaya</option>
              <option value="alam">Alam</option>
              <option value="sejarah">Sejarah</option>
              <option value="pantai">Pantai</option>
            </select>
          </div>

          {/* New field: Travel Style */}
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="travelStyle"
            >
              Gaya Perjalanan
            </label>
            <select
              id="travelStyle"
              name="travelStyle"
              value={preferences.travelStyle}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Pilih gaya perjalanan
              </option>
              <option value="adventure">Petualangan</option>
              <option value="relaxing">Santai</option>
              <option value="cultural">Budaya</option>
              <option value="luxury">Mewah</option>
            </select>
          </div>

          {/* Budget */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="budget"
            >
              Budget Perjalanan
            </label>
            <select
              id="budget"
              name="budget"
              value={preferences.budget}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Pilih budget
              </option>
              <option value="budget">Budget (&lt; Rp 500.000/hari)</option>
              <option value="comfort">
                Comfort (Rp 500.000 - Rp 1.000.000/hari)
              </option>
              <option value="premium">
                Premium (Rp 1.000.000 - Rp 2.000.000/hari)
              </option>
              <option value="luxury">Luxury ({">"}Rp 2.000.000/hari)</option>
            </select>
          </div>

          {/* Group Size field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="groupSize"
            >
              Ukuran Grup
            </label>
            <select
              id="groupSize"
              name="groupSize"
              value={preferences.groupSize}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Pilih ukuran grup
              </option>
              <option value="solo">Solo</option>
              <option value="couple">Berpasangan</option>
              <option value="family">Keluarga (3-5 orang)</option>
              <option value="group">Grup Besar ({">"}5 orang)</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
            >
              Dapatkan Rekomendasi
            </button>
          </div>
        </form>

        {/* Call to Action section */}
        <div
          className="text-center mt-16 p-8 rounded-xl relative overflow-hidden"
          style={{
            backgroundImage: 'url("/images/raja-ampat.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content with relative positioning to appear above overlay */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Jelajahi Destinasi Populer
            </h3>
            <p className="text-gray-100 mb-6 max-w-xl mx-auto">
              Temukan inspirasi perjalanan dari destinasi-destinasi populer yang
              telah dikunjungi oleh ribuan wisatawan.
            </p>
            <Link
              href="/main/search"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
            >
              Jelajahi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
