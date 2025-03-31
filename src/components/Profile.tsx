"use client";

import React, { useState } from "react";
import Image from "next/image"; // Add this import
import {
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaEdit,
  FaArrowLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation"; // Changed from next/router to next/navigation

interface Location {
  id: number;
  name: string;
  region: string;
  image: string;
  rating: number;
  description: string;
}

const Profile: React.FC = () => {
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };

  const [showVisitHistory, setShowVisitHistory] = useState(true);
  const [showPlannedVisits, setShowPlannedVisits] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "User123",
    email: "User123@gmail.com",
    profileImage: "/images/profile.png",
  });

  const visitedLocations: Location[] = [
    {
      id: 1,
      name: "Taman Nasional Komodo",
      region: "Nusa Tenggara Timur",
      image: "/images/pulau-komodo.png",
      rating: 4.5,
      description:
        "Taman Nasional Komodo memiliki banyak sekali tempat wisata yang menarik untuk dikunjungi saat anda berlibur di Nusa Tenggara Timur.",
    },
    {
      id: 2,
      name: "Gunung Bromo",
      region: "Jawa Timur",
      image: "/images/bromo.png",
      rating: 4.5,
      description: "Gunung Bromo terletak di Jawa Timur dan merupakan bagian dari Taman Nasional Bromo Tengger Semeru. Dikenal dengan panorama matahari terbit dan lautan pasirnya.",
    },
    {
      id: 3,
      name: "Raja Ampat",
      region: "Papua Barat",
      image: "/images/raja-ampat.png",
      rating: 4.5,
      description: "Raja Ampat memiliki keindahan bawah laut yang menakjubkan dengan lebih dari 1500 pulau kecil, terumbu karang, dan keanekaragaman hayati laut.",
    },
    {
      id: 4,
      name: "Gunung Bromo",
      region: "Jawa Timur",
      image: "/images/bromo.png",
      rating: 4.5,
      description: "Gunung Bromo terletak di Jawa Timur dan merupakan bagian dari Taman Nasional Bromo Tengger Semeru.",
    },
  ];

  const plannedLocations: Location[] = [
    {
      id: 1,
      name: "Taman Nasional Komodo",
      region: "Nusa Tenggara Timur",
      image: "/images/pulau-komodo.png",
      rating: 4.5,
      description:
        "Taman Nasional Komodo memiliki banyak sekali tempat wisata yang menarik untuk dikunjungi saat anda berlibur di Nusa Tenggara Timur.",
    },
    {
      id: 2,
      name: "Gunung Bromo",
      region: "Jawa Timur",
      image: "/images/bromo.png",
      rating: 4.5,
      description:
        "Gunung Bromo terletak di Jawa Timur dan merupakan bagian dari Taman Nasional Bromo Tengger Semeru. Dikenal dengan panorama matahari terbit dan lautan pasirnya, Bromo adalah destinasi favorit pendaki dan fotografer.",
    },
    {
      id: 3,
      name: "Pulau Raja Ampat",
      region: "Papua Barat Daya",
      image: "/images/raja-ampat.png",
      rating: 4.5,
      description:
        "Raja Ampat berada di Papua Barat Daya, Indonesia. Terkenal akan keindahan bawah lautnya, kepulauan ini memiliki lebih dari 1500 pulau kecil, terumbu karang alami, dan keanekaragaman hayati laut yang menakjubkan. Cocok untuk penyelam dan pecinta alam.",
    },
  ];

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditProfile(false);
    // Here you would typically send the updated profile data to a server
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-yellow-500 font-bold">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Image */}
      <div className="relative h-56 md:h-64 lg:h-72 w-full overflow-hidden">
        <Image
          src="/images/bromo.png"
          alt="Profile Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Back Button - Added Here */}
        <button
          className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
          onClick={goBack}
          aria-label="Go back"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl mx-auto -mt-20 z-10">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative -mt-24 bg-white rounded-full p-1 shadow-lg">
              <Image
                src={profileData.profileImage}
                alt="Profile"
                width={128}
                height={128}
                className="rounded-full object-cover border-4 border-white"
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <h1 className="text-2xl font-bold">{profileData.username}</h1>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
            >
              <FaEdit /> Edit Profil
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button
                onClick={() => setShowEditProfile(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditProfile}>
              <div className="mb-4 flex flex-col items-center">
                <div className="relative mb-4">
                  <Image
                    src={profileData.profileImage}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
                  >
                    <FaEdit size={14} />
                  </button>
                </div>
                <div className="w-full mb-4">
                  <label className="block text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        username: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="w-full mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visit History Section */}
      <div className="max-w-4xl mx-auto mt-6 bg-gray-200 rounded-lg overflow-hidden">
        <button
          className="w-full px-6 py-4 flex justify-between items-center bg-gray-300 hover:bg-gray-400 transition"
          onClick={() => setShowVisitHistory(!showVisitHistory)}
        >
          <h2 className="text-lg font-semibold">Riwayat kunjungan</h2>
          {showVisitHistory ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {showVisitHistory && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {visitedLocations.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="h-40 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={location.image}
                      alt={location.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-lg truncate">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-600">{location.region}</p>
                  <div className="flex items-center mt-2">
                    {renderRatingStars(location.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Planned Visits Section */}
      <div className="max-w-4xl mx-auto mt-6 bg-gray-200 rounded-lg overflow-hidden mb-8">
        <button
          className="w-full px-6 py-4 flex justify-between items-center bg-gray-300 hover:bg-gray-400 transition"
          onClick={() => setShowPlannedVisits(!showPlannedVisits)}
        >
          <h2 className="text-lg font-semibold">Rencana kunjungan</h2>
          {showPlannedVisits ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {showPlannedVisits && (
          <div className="p-4 space-y-4">
            {plannedLocations.map((location) => (
              <div
                key={location.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden relative">
                    <Image
                      src={location.image}
                      alt={location.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-xl">{location.name}</h3>
                        <p className="text-sm text-gray-600">
                          {location.region}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <p className="mt-2 text-gray-700 text-sm">
                      {location.description}
                    </p>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-700 mr-2">Rating:</span>
                        {renderRatingStars(location.rating)}
                      </div>

                      {location.id === 1 ? (
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                          Sudah Dikunjungi
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                          Belum Dikunjungi
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
