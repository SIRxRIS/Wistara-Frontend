import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // Add this import

type Province = {
  id: string;
  name: string;
};

type Destination = {
  id: string;
  name: string;
  location: string;
  province: string;
  rating: number;
  image: string;
};

type LocationOption = {
  id: string;
  name: string;
  isSelected: boolean;
};

const Search = () => {
  // Remove router declaration since it's not used
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [sortOption, setSortOption] = useState("Popular");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [locations, setLocations] = useState<LocationOption[]>([]);

  // Add this near the top with other imports
  const fetchProvinces = async () => {
    try {
      const response = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      const provinces = await response.json();
      setLocations(
        provinces.map((province: Province) => ({
          id: province.id,
          name: province.name,
          isSelected: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Add this useEffect to fetch provinces when component mounts
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Sample destinations data
  const destinations: Destination[] = [
    {
      id: "1",
      name: "Taman Nasional Komodo",
      location: "Nusa Tenggara Timur",
      province: "Nusa Tenggara Timur",
      rating: 4.5,
      image: "/images/pulau-komodo.png",
    },
    {
      id: "2",
      name: "Gunung Bromo",
      location: "Papua Barat",
      province: "Papua Barat",
      rating: 4.5,
      image: "/images/bromo.png",
    },
    {
      id: "3",
      name: "Rumah Tongkonan",
      location: "Sulawesi Selatan",
      province: "Sulawesi Selatan",
      rating: 4.5,
      image: "/images/toraja.png",
    },
    {
      id: "4",
      name: "Candi Prambanan",
      location: "DI Yogyakarta",
      province: "DI Yogyakarta",
      rating: 4.5,
      image: "/images/prambanan.png",
    },
    {
      id: "5",
      name: "Raja Ampat",
      location: "Papua Barat",
      province: "Papua Barat",
      rating: 4.5,
      image: "/images/raja-ampat.png",
    },
    {
      id: "6",
      name: "Pura Ulun",
      location: "Bali",
      province: "Bali",
      rating: 4.5,
      image: "/images/pura-ulun.png",
    },
    {
      id: "7",
      name: "Danau Toba",
      location: "Sumatera Utara",
      province: "Sumatera Utara",
      rating: 4.5,
      image: "/images/toba.png",
    },
    {
      id: "8",
      name: "Bantimurung",
      location: "Sulawesi Selatan",
      province: "Sulawesi Selatan",
      rating: 4.5,
      image: "/images/bantimurung.png",
    },
  ];

  // Filter destinations based on search query and selected filters
  const filteredDestinations = destinations.filter((dest) => {
    // Filter by search query
    if (
      searchQuery &&
      !dest.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by selected locations
    const selectedLocations = locations
      .filter((loc) => loc.isSelected)
      .map((loc) => loc.name);
    if (
      selectedLocations.length > 0 &&
      !selectedLocations.includes(dest.province)
    ) {
      return false;
    }

    // Filter by rating
    if (selectedRating !== null && dest.rating < selectedRating) {
      return false;
    }

    return true;
  });

  // Sort destinations based on selected sort option
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortOption === "Rating tertinggi") {
      return b.rating - a.rating;
    }
    // For "Popular" and "Terdekat", we'll just keep the original order for now
    // In a real app, you'd have additional data to sort by
    return 0;
  });

  const toggleLocationSelection = (id: string) => {
    setLocations(
      locations.map((loc) =>
        loc.id === id ? { ...loc, isSelected: !loc.isSelected } : loc
      )
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target as Node)
      ) {
        setShowFilterOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="py-4 px-4 md:px-16 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center">
          <Image
            src="/images/logo-wistara.png"
            alt="Wistara Logo"
            width={100}
            height={100}
            className="object-contain"
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
            href="/"
            className="text-blue-950 hover:text-blue-800 font-medium"
          >
            Beranda
          </Link>
          <Link href="/about" className="text-blue-950 hover:text-blue-800">
            Tentang kami
          </Link>
          <Link
            href="/personalization"
            className="text-blue-950 hover:text-blue-800"
          >
            Personalisasi
          </Link>
          <Link href="/favorites" className="text-blue-950 hover:text-blue-800">
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
                className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10 px-4 md:px-16">
        <h1 className="text-4xl text-center font-bold text-green-800 mb-2">
          Selamat Berpergian
        </h1>
        <p className="text-center text-gray-700 max-w-4xl mx-auto mb-12">
          Nikmati liburan yang sempurna dengan destinasi terbaik pilihan kami,
          dari wisata alam hingga warisan budaya yang kaya
        </p>

        {/* Filter and Sort Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative" ref={sortRef}>
            <button
              className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center text-gray-700"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              {sortOption}
              <svg
                className={`ml-2 h-5 w-5 transition-transform ${
                  showSortDropdown ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSortOption("Popular");
                    setShowSortDropdown(false);
                  }}
                >
                  Popular
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSortOption("Rating tertinggi");
                    setShowSortDropdown(false);
                  }}
                >
                  Rating tertinggi
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSortOption("Terdekat");
                    setShowSortDropdown(false);
                  }}
                >
                  Terdekat
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={filterRef}>
            <button
              className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center text-gray-700"
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              Filter
              <svg
                className={`ml-2 h-5 w-5 transition-transform ${
                  showFilterOptions ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilterOptions && (
          <div
            ref={filterPanelRef}
            className="mb-8 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Kategori
                </h3>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-2"
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
                    <input
                      type="text"
                      placeholder="Cari Budaya, Sejarah dan Alam"
                      className="w-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Lokasi
                </h3>
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white"
                    onClick={() =>
                      setShowLocationDropdown(!showLocationDropdown)
                    }
                  >
                    <span>Pilih Lokasi</span>
                    <svg
                      className={`h-5 w-5 transition-transform ${
                        showLocationDropdown ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {showLocationDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                      {locations.map((location) => (
                        <div
                          key={location.id}
                          className="px-4 py-2 hover:bg-gray-100 flex items-center"
                          onClick={() => toggleLocationSelection(location.id)}
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center ${
                              location.isSelected
                                ? "bg-green-600"
                                : "border border-gray-400"
                            }`}
                          >
                            {location.isSelected && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="ml-2">{location.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Rating
                </h3>
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 text-gray-700 bg-white"
                    onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                  >
                    <span>Pilih Rating</span>
                    <svg
                      className={`h-5 w-5 transition-transform ${
                        showRatingDropdown ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {showRatingDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div
                          key={rating}
                          className="px-4 py-2 hover:bg-gray-100 flex items-center"
                          onClick={() => {
                            setSelectedRating(rating);
                            setShowRatingDropdown(false);
                          }}
                        >
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <svg
                                key={index}
                                className={`h-5 w-5 ${
                                  index < rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          {selectedRating === rating && (
                            <svg
                              className="h-5 w-5 ml-2 text-green-600"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              
              <div className="h-48 relative">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    {destination.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-medium mr-1">
                      {destination.rating}
                    </span>
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {destination.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Tidak ada hasil yang ditemukan
            </p>
            <p className="text-gray-400 mt-2">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
