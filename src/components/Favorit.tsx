"use client";

// Add useCallback to the imports
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
// Remove unused import
// import { useRouter } from "next/navigation";

// Tipe data untuk lokasi
type LocationOption = {
  id: string;
  name: string;
  isSelected: boolean;
};

// Komponen Card untuk setiap destinasi wisata
interface DestinationCardProps {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  image: string;
  onRemove: (id: string) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  id,
  name,
  location,
  description,
  rating,
  image,
  onRemove,
}) => {
  // Buat array untuk menampilkan bintang rating
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
    >
      ★
    </span>
  ));

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative h-64 md:h-auto">
          <Image
            src={`/images/${image}`}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
        <div className="md:w-2/3 p-4">
          <h3 className="text-xl font-bold text-green-800">{name}</h3>
          <p className="text-gray-600 mb-2">{location}</p>
          <p className="text-gray-700 mb-4">{description}</p>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium mb-1">Rating:</p>
              <div className="flex items-center">
                <div className="flex text-xl">{stars}</div>
                <span className="ml-2 text-yellow-500 font-bold">{rating}</span>
              </div>
            </div>
            <button
              onClick={() => onRemove(id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Hapus dari favorit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FavoritPage: React.FC = () => {
  // Remove unused router if not being used
  // const router = useRouter();

  // State untuk dropdown
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);

  // Ref untuk dropdown
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);

  // Data destinasi wisata
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      name: "Taman Nasional Komodo",
      location: "Nusa Tenggara Timur",
      description:
        "Taman Nasional Komodo memiliki banyak sekali tempat wisata yang menarik untuk dikunjungi saat anda berlibur di Nusa Tenggara Timur.",
      rating: 4.5,
      image: "pulau-komodo.png",
    },
    {
      id: "2",
      name: "Gunung Bromo",
      location: "Jawa Timur",
      description:
        "Gunung Bromo terletak di Jawa Timur dan merupakan bagian dari Taman Nasional Bromo Tengger Semeru. Dikenal dengan panorama matahari terbit dan lautan pasirnya, Bromo adalah destinasi favorit pendaki dan fotografer.",
      rating: 4.5,
      image: "bromo.png",
    },
    {
      id: "3",
      name: "Pulau Raja Ampat",
      location: "Papua Barat Daya",
      description:
        "Raja Ampat berada di Papua Barat Daya, Indonesia. Terkenal akan keindahan bawah lautnya, kepulauan ini memiliki lebih dari 1.500 pulau kecil, terumbu karang alami, dan keanekaragaman hayati laut yang menakjubkan. Cocok untuk penyelam dan pecinta alam.",
      rating: 4.5,
      image: "raja-ampat.png",
    },
  ]);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("Popular");
  const [locations, setLocations] = useState<LocationOption[]>([]);

  // Fungsi untuk menghapus item dari favorit
  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  // Fungsi untuk toggle selection lokasi
  const toggleLocationSelection = (id: string) => {
    setLocations(
      locations.map((loc) =>
        loc.id === id ? { ...loc, isSelected: !loc.isSelected } : loc
      )
    );
  };

  // Add proper type for province data
  interface ProvinceData {
    id: string;
    name: string;
  }

  // Fetch provinsi dari API
  // Wrap fetchProvinces with useCallback
  const fetchProvinces = useCallback(async () => {
    try {
      const response = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      const provinces = await response.json();
      setLocations(
        provinces.map((province: ProvinceData) => ({
          id: province.id,
          name: province.name,
          isSelected: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching provinces:", error);
      setLocations(() => {
        const uniqueLocations = Array.from(
          new Set(favorites.map((favorite) => favorite.location))
        );
        return uniqueLocations.map((loc, index) => ({
          id: index.toString(),
          name: loc,
          isSelected: false,
        }));
      });
    }
  }, [favorites]); // Add favorites to the dependency array

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  // Filter dan sort data favorit
  const filteredFavorites = favorites.filter((favorite) => {
    // Filter berdasarkan pencarian
    if (
      searchQuery &&
      !favorite.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter berdasarkan lokasi terpilih
    const selectedLocationNames = locations
      .filter((loc) => loc.isSelected)
      .map((loc) => loc.name);

    if (
      selectedLocationNames.length > 0 &&
      !selectedLocationNames.includes(favorite.location)
    ) {
      return false;
    }

    // Filter berdasarkan rating jika dipilih
    if (selectedRating !== null && favorite.rating < selectedRating) {
      return false;
    }

    return true;
  });

  // Sort destinasi
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortOption === "Rating tertinggi") {
      return b.rating - a.rating;
    } else if (sortOption === "Nama (A-Z)") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "Nama (Z-A)") {
      return b.name.localeCompare(a.name);
    }
    // Default: Popular
    return 0;
  });

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
            className="text-blue-950 hover:text-blue-800 "
          >
            Personalisasi
          </Link>
          <Link
            href="/main/favorit"
            className="text-blue-950 hover:text-blue-800 font-medium"
          >
            Favorit
          </Link>
        </div>

        <div className="flex items-center">
          <div className="w-10 h-10 relative">
            <Image
              src="/images/profile.png"
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10 px-4 md:px-16">
        <h1 className="text-4xl text-center font-bold text-green-800 mb-2">
          Wisata Favorit
        </h1>
        <p className="text-center text-gray-700 max-w-4xl mx-auto mb-12">
          Destinasi wisata favorit pilihan Anda tersimpan di sini, dari wisata
          alam hingga warisan budaya yang kaya
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
                    setSortOption("Nama (A-Z)");
                    setShowSortDropdown(false);
                  }}
                >
                  Nama (A-Z)
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSortOption("Nama (Z-A)");
                    setShowSortDropdown(false);
                  }}
                >
                  Nama (Z-A)
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

        {/* Daftar Destinasi Favorit */}
        <div>
          {sortedFavorites.length > 0 ? (
            sortedFavorites.map((destination) => (
              <DestinationCard
                key={destination.id}
                id={destination.id}
                name={destination.name}
                location={destination.location}
                description={destination.description}
                rating={destination.rating}
                image={destination.image}
                onRemove={removeFavorite}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Tidak ada destinasi favorit yang ditemukan
              </p>
              <p className="text-gray-400 mt-2">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritPage;
