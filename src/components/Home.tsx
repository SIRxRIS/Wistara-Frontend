import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  image: string;
  id: string;
}

function Home() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    {
      image: "/images/borobudur.png",
      id: "01",
    },
    {
      image: "/images/malino.png",
      id: "02",
    },
    {
      image: "/images/bantimurung.png",
      id: "03",
    },
    {
      image: "/images/raja-ampat.png",
      id: "04",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7)",
            }}
          />
        ))}

        {/* Header/Navigation */}
        <header className="relative z-10 flex justify-between items-center px-6 py-4">
          {/* Bagian Kiri: Logo, Search, dan Navigasi */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="ml-20">
              <Image
                src="/images/logo-wistara.png"
                alt="Wistara Logo"
                width={150}
                height={40}
                className="object-contain"
              />
            </div>

            {/* Search Bar */}
            <div className="mx-4 max-w-md w-[300px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari destinasi wisata..."
                  className="w-full bg-white/20 text-[#cacaca] rounded-full py-3 px-10 text-[18px] 
                    placeholder-gray-300 border border-white/30 
                    shadow-md shadow-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigasi */}
            <nav className="flex items-center ml-15 space-x-6">
              <Link
                href="/"
                className="text-[#3B82F6] hover:text-blue-400 text-[22px] font-medium"
              >
                Beranda
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 text-[22px]"
              >
                Tentang kami
              </Link>
              <Link
                href="/personalize"
                className="text-white hover:text-gray-300 text-[22px]"
              >
                Personalisasi
              </Link>
            </nav>
          </div>

          {/* Bagian Kanan: Daftar & Masuk */}
          <div className="ml-auto flex items-center space-x-4">
            <Link
              href="/register"
              className="text-white hover:text-gray-300 font-bold text-[20px]"
            >
              Daftar
            </Link>
            <Link
              href="/login"
              className="bg-[#042948] text-white px-6 py-2 font-bold mr-20 rounded-full text-[20px] hover:bg-blue-900 transition-colors"
            >
              Masuk
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 pt-32">
          <div className="max-w-2xl">
            <h1 className="text-white text-[96px] font-bold mb-8 tracking-wide leading-[100px]">
              HALO
              <br />
              WISATAWAN
            </h1>

            <Link
              href="/explore"
              className="inline-block bg-green-700 text-white px-8 py-3 mt-10 rounded-md hover:bg-green-800 transition-colors"
            >
              Jelajahi Sekarang
            </Link>

            <div className="mt-20">
              <p className="text-white text-[24px] max-w-2xl">
                Jelajahi keindahan Indonesia! Temukan destinasi wisata terbaik,
                mulai dari pegunungan yang menawan hingga pantai yang eksotis.
                Siapkan petualanganmu sekarang bersama Wistara!
              </p>

              <div className="mt-30 flex items-center space-x-4">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 w-12 cursor-pointer ${
                      currentSlide === index
                        ? "bg-[#d9d9d9]"
                        : "bg-[#d9d9d9] opacity-50"
                    }`}
                  ></div>
                ))}
                <span className="text-white ml-2">
                  {slides[currentSlide].id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Rekomendasi Destinasi Section */}
      <div className="min-h-screen w-full py-20 px-4 bg-white">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
            {/* Kartu Destinasi Kiri */}
            <div className="md:col-span-1 space-y-6">
              <div className="relative overflow-hidden rounded-3xl shadow-lg h-96 group">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/bromo.png')" }}
                ></div>
                <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">
                    Gunung Bromo
                  </h3>
                  <p className="text-gray-200 text-sm">mount bromo</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl shadow-lg h-96 group">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/prambanan.png')" }}
                ></div>
                <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">
                    Candi Prambanan
                  </h3>
                  <p className="text-gray-200 text-sm">prambanan temple</p>
                </div>
              </div>
            </div>

            {/* Kartu Rekomendasi Tengah */}
            <div className="md:col-span-1 relative overflow-hidden rounded-3xl shadow-lg flex flex-col border border-blue-100 h-full">
              <div className="relative flex-1 p-8 flex flex-col justify-between">
                {/* Awan Hijau Kecil (Kiri Atas) */}
                <img
                  src="/images/awan-hijau-muda.png"
                  alt="Dekorasi"
                  className="absolute top-0 right-0 w-28 h-24"
                />

                <div className="relative z-10 text-center pt-16">
                  <h2 className="text-4xl font-bold mb-2">Rekomendasi</h2>
                  <h2 className="text-4xl font-bold mb-8">Kami</h2>

                  <p className="text-gray-700 text-center mb-16 text-lg">
                    Jelajahi keindahan Indonesia dengan rekomendasi destinasi
                    terbaik kami. Nikmati panorama matahari terbit di Gunung
                    Bromo, kagumi keagungan Candi Prambanan, hingga merasakan
                    ketenangan di Danau Toba. Destinasi impian Anda ada di sini!
                  </p>
                </div>

                <div className="flex justify-center mb-12 relative z-10">
                  <Link
                    href="/recommendations"
                    className="bg-blue-800 text-white px-8 py-4 rounded-full hover:bg-blue-900 transition text-lg"
                  >
                    Lihat lebih banyak
                  </Link>
                </div>

                {/* Awan Hijau Besar (Kiri Bawah) */}
                <img
                  src="/images/awan-hijau-tua.png"
                  alt="Dekorasi"
                  className="absolute bottom-0 left-0 w-32 h-48"
                />

                {/* Awan Biru (Kanan Bawah) */}
                <img
                  src="/images/awan-biru-muda.png"
                  alt="Dekorasi"
                  className="absolute bottom-0 right-0 w-36 h-32"
                />
              </div>
            </div>

            {/* Kartu Destinasi Kanan */}
            <div className="md:col-span-1 space-y-6">
              <div className="relative overflow-hidden rounded-3xl shadow-lg h-96 group">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/toba.png')" }}
                ></div>
                <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">Danau Toba</h3>
                  <p className="text-gray-200 text-sm">lake toba</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl shadow-lg h-96 group">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/monas.png')" }}
                ></div>
                <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold">
                    Monumen Nasional
                  </h3>
                  <p className="text-gray-200 text-sm">the national monument</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
