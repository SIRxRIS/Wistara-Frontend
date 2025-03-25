import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";

// Define interfaces for our data
interface Province {
  id: string;
  name: string;
  isSelected: boolean;
}

// DropdownPortal component
const DropdownPortal = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create a div element for the portal
    const element = document.createElement("div");
    element.setAttribute("id", "dropdown-portal");
    document.body.appendChild(element);
    setPortalElement(element);

    // Cleanup function
    return () => {
      if (element && document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!isOpen || !portalElement) return null;

  return ReactDOM.createPortal(children, portalElement);
};

const Main: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filterButtonRef = React.useRef<HTMLButtonElement>(null);

  // Calculate position for dropdown
  const updateFilterPosition = () => {
    if (filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setFilterPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 288, // 288px is the width of dropdown (w-72 = 18rem = 288px)
      });
    }
  };

  // Fetch provinces from API
  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoading(true);
      try {
        // Fetch data from the Indonesian provinces API
        const response = await fetch(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Transform the API response to match our Province interface
        const formattedProvinces: Province[] = data.map((province: any) => ({
          id: province.id,
          name: province.name,
          isSelected: false,
        }));

        setProvinces(formattedProvinces);
      } catch (err) {
        console.error("Error fetching provinces:", err);
        setError("Failed to load provinces");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Update filter position when it opens
  useEffect(() => {
    if (filterOpen) {
      updateFilterPosition();
      // Add resize listener to update position if window is resized
      window.addEventListener("resize", updateFilterPosition);
    }
    return () => {
      window.removeEventListener("resize", updateFilterPosition);
    };
  }, [filterOpen]);

  // Function to toggle province selection
  const toggleFilter = (id: string) => {
    setProvinces((prev) =>
      prev.map((province) =>
        province.id === id
          ? { ...province, isSelected: !province.isSelected }
          : province
      )
    );
  };

  // Function to get selected provinces
  const getSelectedProvinces = () => {
    return provinces.filter((province) => province.isSelected);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section with Background Image */}
      <div className="relative h-[55vh] w-[90%] mx-auto rounded-b-[45px] overflow-hidden">
        <img
          src="/images/pura-ulun.png"
          alt="Pura Ulun Danu Bali"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay to darken the image */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 p-6 md:container md:mx-auto">
          {/* Navigation */}
          <nav className="flex items-center justify-between py-2 mb-15">
            <div className="flex items-center">
              <img
                src="/images/logo-wistara.png"
                alt="Wistara Logo"
                className="h-15 object-contain"
              />
            </div>
            <div className="hidden md:flex mr-120 space-x-8">
              <Link
                href="/main/home"
                className="text-[#3B82F6] hover:text-blue-400 text-[20px] font-medium"
              >
                Beranda
              </Link>
              <Link
                href="/main/about"
                className="text-white hover:text-blue-400 text-[20px]"
              >
                Tentang kami
              </Link>
              <Link
                href="/main/personal"
                className="text-white hover:text-blue-400 text-[20px]"
              >
                Personalisasi
              </Link>
              <Link
                href="/main/favorit"
                className="text-white hover:text-blue-400 text-[20px]"
              >
                Favorit
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="/main/profile">
                <div className="w-15 h-15 flex items-center justify-center">
                  <img
                    src="/images/profile.png"
                    alt="Profile"
                    className="w-13 h-13 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center h-[30vh]">
            <h2 className="text-white text-5xl md:text-6xl font-bold text-center mb-16">
              Tujuan kamu kemana?
            </h2>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row w-full max-w-3xl gap-4">
              <div className="flex-1 relative">
                <Link href="/main/search">
                  <input
                    type="text"
                    placeholder="Cari destinasi wisata..."
                    className="w-full py-3 px-6 rounded-full text-[#000000] bg-white/70 shadow-lg cursor-pointer"
                  />
                  <button className="absolute right-3 top-2 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
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
                  </button>
                </Link>
              </div>

              <div className="relative">
                <button
                  ref={filterButtonRef}
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="bg-white/70 text-[#000000] rounded-full py-3 px-8 shadow-lg flex items-center"
                >
                  <span>Filter By</span>
                  {getSelectedProvinces().length > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getSelectedProvinces().length}
                    </span>
                  )}
                </button>

                {/* Dropdown Portal */}
                <DropdownPortal isOpen={filterOpen}>
                  <div
                    className="fixed bg-white rounded-xl shadow-lg p-4 w-72 z-50"
                    style={{
                      top: `${filterPosition.top}px`,
                      left: `${filterPosition.left}px`,
                    }}
                  >
                    {isLoading ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      </div>
                    ) : error ? (
                      <div>
                        <p className="text-red-500 text-sm mb-2">{error}</p>
                        <button
                          onClick={() => {
                            setError(null);
                            const fetchProvinces = async () => {
                              setIsLoading(true);
                              try {
                                const response = await fetch(
                                  "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
                                );
                                if (!response.ok) {
                                  throw new Error(
                                    `HTTP error! Status: ${response.status}`
                                  );
                                }
                                const data = await response.json();
                                const formattedProvinces: Province[] = data.map(
                                  (province: any) => ({
                                    id: province.id,
                                    name: province.name,
                                    isSelected: false,
                                  })
                                );
                                setProvinces(formattedProvinces);
                              } catch (err) {
                                console.error("Error fetching provinces:", err);
                                setError("Failed to load provinces");
                              } finally {
                                setIsLoading(false);
                              }
                            };
                            fetchProvinces();
                          }}
                          className="text-blue-500 text-sm underline"
                        >
                          Coba lagi
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="sticky top-0 bg-white pb-2 border-b mb-2 flex justify-between">
                          <span className="font-medium text-blue-950">
                            Provinsi ({provinces.length})
                          </span>
                          <button
                            className="text-blue-500 text-sm"
                            onClick={() =>
                              setProvinces(
                                provinces.map((p) => ({
                                  ...p,
                                  isSelected: false,
                                }))
                              )
                            }
                          >
                            Reset
                          </button>
                        </div>
                        <div className="max-h-80 overflow-y-auto pr-1">
                          {provinces.map((province) => (
                            <div
                              key={province.id}
                              className="flex items-center mb-2 hover:bg-gray-100 p-1 rounded"
                            >
                              <div
                                onClick={() => toggleFilter(province.id)}
                                className={`min-w-6 h-6 rounded border flex items-center justify-center cursor-pointer ${
                                  province.isSelected
                                    ? "bg-green-600 border-green-600"
                                    : "border-gray-400"
                                }`}
                              >
                                {province.isSelected && (
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
                              <span className="ml-2 text-blue-950">
                                {province.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </DropdownPortal>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section - Now outside the hero section but still in the main container */}
      <div className="bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mt-5 text-[#2B5C2E] mb-4">
            Selamat Berpergian
          </h2>
          <p className="text-center text-gray-800 max-w-3xl mx-auto mb-5">
            Ayo berpetualang! Temukan tempat baru, rasakan pengalaman seru, dan
            ciptakan kenangan indah bersama WISTARA.
          </p>

          {/* Destination Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Raja Ampat Card */}
            <div className="relative rounded-xl overflow-hidden shadow-lg h-65">
              <img
                src="/images/raja-ampat.png"
                alt="Raja Ampat"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-all duration-300"></div>
            </div>

            {/* Gunung Bromo Card */}
            <div className="relative rounded-xl overflow-hidden shadow-lg h-65">
              <img
                src="/images/bromo.png"
                alt="Gunung Bromo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/15 hover:bg-black/40 transition-all duration-300"></div>
            </div>

            {/* Toraja Card */}
            <div className="relative rounded-xl overflow-hidden shadow-lg h-65">
              <img
                src="/images/toraja.png"
                alt="Toraja"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/15 hover:bg-black/40 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
