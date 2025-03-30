import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  image: string;
  id: string;
}

interface Destination {
  name: string;
  location: string;
  image: string;
  englishName: string;
}

const featuredDestinations: Destination[] = [
  {
    name: "Raja Ampat",
    location: "Papua Barat",
    image: "/images/raja-ampat.png",
    englishName: "raja ampat",
  },
  {
    name: "Labuan Bajo",
    location: "Nusa Tenggara Timur",
    image: "/images/labuan-bajo.png",
    englishName: "labuan bajo",
  },
  {
    name: "Borobudur",
    location: "Jawa Tengah",
    image: "/images/borobudur.png",
    englishName: "borobudur temple",
  },
  {
    name: "Pura Ulun",
    location: "Bali",
    image: "/images/pura-ulun.png",
    englishName: "ulun temple",
  },
];

// Remove recommendedDestinations array since it's not being used

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  const slides: Slide[] = [
    { image: "/images/borobudur.png", id: "01" },
    { image: "/images/malino.png", id: "02" },
    { image: "/images/bantimurung.png", id: "03" },
    { image: "/images/raja-ampat.png", id: "04" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Menghapus handleSearch jika tidak digunakan atau gunakan di tempat yang tepat

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
                {/* In the search input section, remove the unused onChange handler */}
                <input
                  type="text"
                  placeholder="Cari destinasi wisata..."
                  className="w-full bg-white/20 text-[#cacaca] rounded-full py-3 px-10 text-[18px] 
                    placeholder-gray-300 border border-white/30 
                    shadow-md shadow-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                />

                {/* In the Featured Destinations section, use the destinations array directly
                instead of FEATURED_DESTINATIONS constant */}
                <div className="container mx-auto h-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                    {/* Kartu Destinasi Kiri */}
                    <div className="md:col-span-1 space-y-6">
                      <div className="relative overflow-hidden rounded-3xl shadow-lg h-96 group">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: "url('/images/bromo.png')",
                          }}
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
                          style={{
                            backgroundImage: "url('/images/prambanan.png')",
                          }}
                        ></div>
                        <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                          <h3 className="text-white text-2xl font-bold">
                            Candi Prambanan
                          </h3>
                          <p className="text-gray-200 text-sm">
                            prambanan temple
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Kartu Rekomendasi Tengah */}
                    <div className="md:col-span-1 relative overflow-hidden rounded-3xl shadow-lg flex flex-col border border-blue-100 h-full">
                      <div className="relative flex-1 p-8 flex flex-col justify-between">
                        {/* Awan Hijau Kecil (Kiri Atas) */}
                        <Image
                          src="/images/awan-hijau-muda.png"
                          alt="Dekorasi"
                          width={112} // w-28 = 112px
                          height={96} // h-24 = 96px
                          className="absolute top-0 right-0"
                        />

                        <div className="relative z-10 text-center pt-16">
                          <h2 className="text-4xl font-bold mb-2">
                            Rekomendasi
                          </h2>
                          <h2 className="text-4xl font-bold mb-8">Kami</h2>

                          <p className="text-gray-700 text-center mb-16 text-lg">
                            Jelajahi keindahan Indonesia dengan rekomendasi
                            destinasi terbaik kami. Nikmati panorama matahari
                            terbit di Gunung Bromo, kagumi keagungan Candi
                            Prambanan, hingga merasakan ketenangan di Danau
                            Toba. Destinasi impian Anda ada di sini!
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
                        <Image
                          src="/images/awan-hijau-tua.png"
                          alt="Dekorasi"
                          width={128} // w-32 = 128px
                          height={192} // h-48 = 192px
                          className="absolute bottom-0 left-0"
                        />

                        {/* Awan Biru (Kanan Bawah) */}
                        <Image
                          src="/images/awan-biru-muda.png"
                          alt="Dekorasi"
                          width={144} // w-36 = 144px
                          height={128} // h-32 = 128px
                          className="absolute bottom-0 right-0"
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
                          <h3 className="text-white text-2xl font-bold">
                            Danau Toba
                          </h3>
                          <p className="text-gray-200 text-sm">lake toba</p>
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-3xl shadow-lg h-96 group">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: "url('/images/monas.png')",
                          }}
                        ></div>
                        <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
                          <h3 className="text-white text-2xl font-bold">
                            Monumen Nasional
                          </h3>
                          <p className="text-gray-200 text-sm">
                            the national monument
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                href="/home/about"
                className="text-white hover:text-gray-300 text-[22px]"
              >
                Tentang kami
              </Link>
              <Link
                href="/home/personal"
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
                <Image
                  src="/images/awan-hijau-muda.png"
                  alt="Dekorasi"
                  width={112} // w-28 = 112px
                  height={96} // h-24 = 96px
                  className="absolute top-0 right-0"
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
                <Image
                  src="/images/awan-hijau-tua.png"
                  alt="Dekorasi"
                  width={128} // w-32 = 128px
                  height={192} // h-48 = 192px
                  className="absolute bottom-0 left-0"
                />

                {/* Awan Biru (Kanan Bawah) */}
                <Image
                  src="/images/awan-biru-muda.png"
                  alt="Dekorasi"
                  width={144} // w-36 = 144px
                  height={128} // h-32 = 128px
                  className="absolute bottom-0 right-0"
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
      {/* Featured Destinations Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Destinasi Populer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featuredDestinations.map((dest, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl h-72">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${dest.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                    <p className="text-sm opacity-90">{dest.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Keunggulan Wistara Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Kenapa Memilih Wistara?
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
            Platform terpercaya untuk menemukan destinasi wisata terbaik di
            Indonesia
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Informasi Lengkap</h3>
              <p className="text-gray-600">
                Detail lokasi, harga tiket, jam operasional, dan fasilitas
                tersedia untuk setiap destinasi wisata
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Rekomendasi Personal</h3>
              <p className="text-gray-600">
                Dapatkan rekomendasi destinasi wisata yang sesuai dengan
                preferensi dan budget Anda
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Ulasan Terpercaya</h3>
              <p className="text-gray-600">
                Baca pengalaman langsung dari wisatawan lain untuk membantu
                perencanaan perjalanan Anda
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-xl bg-blue-50">
              <h4 className="text-3xl font-bold text-blue-600 mb-2">50+</h4>
              <p className="text-gray-600">Destinasi Wisata</p>
            </div>
            <div className="p-6 rounded-xl bg-green-50">
              <h4 className="text-3xl font-bold text-green-600 mb-2">5+</h4>
              <p className="text-gray-600">Kategori Wisata</p>
            </div>
            <div className="p-6 rounded-xl bg-yellow-50">
              <h4 className="text-3xl font-bold text-yellow-600 mb-2">10+</h4>
              <p className="text-gray-600">Provinsi Terjangkau</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50">
              <h4 className="text-3xl font-bold text-purple-600 mb-2">24/7</h4>
              <p className="text-gray-600">Layanan Informasi</p>
            </div>
            <div className="p-6 rounded-xl bg-yellow-50">
              <h4 className="text-3xl font-bold text-yellow-600 mb-2">100K+</h4>
              <p className="text-gray-600">Ulasan Wisata</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50">
              <h4 className="text-3xl font-bold text-purple-600 mb-2">34</h4>
              <p className="text-gray-600">Provinsi di Indonesia</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e4d8a] text-white">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Image
                src="/images/logo-wistara.png"
                alt="Wistara"
                width={150}
                height={40}
                className="mb-6"
              />
              <p className="text-gray-300 text-sm">
                Wistara adalah platform wisata terpercaya yang membantu Anda
                menemukan destinasi wisata terbaik di Indonesia. Kami
                berkomitmen untuk memberikan pengalaman terbaik dalam
                merencanakan perjalanan Anda.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Destinasi</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/destinations/popular"
                    className="text-gray-300 hover:text-white"
                  >
                    Destinasi Populer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/destinations/new"
                    className="text-gray-300 hover:text-white"
                  >
                    Destinasi Baru
                  </Link>
                </li>
                <li>
                  <Link
                    href="/destinations/recommended"
                    className="text-gray-300 hover:text-white"
                  >
                    Rekomendasi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/destinations/categories"
                    className="text-gray-300 hover:text-white"
                  >
                    Kategori
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Layanan</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white"
                  >
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white"
                  >
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
              <div className="space-y-4 text-sm">
                <p className="text-gray-300">Email: info@wistara.com</p>
                <p className="text-gray-300">Telepon: +62 812-3456-7890</p>
                <div className="flex space-x-4 mt-6">
                  <a
                    href="https://instagram.com/wistara"
                    className="text-gray-300 hover:text-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/wistara"
                    className="text-gray-300 hover:text-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/wistara"
                    className="text-gray-300 hover:text-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-5 text-center text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Wistara. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
