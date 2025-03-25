"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[288px] w-full flex items-center justify-center bg-gray-100">
      Loading map...
    </div>
  ),
});

const Map = () => {
  return (
    <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-2 border-b border-gray-200">
          <div className="flex items-center">
            <div className="font-medium">Taman Nasional Komodo</div>
          </div>
          <div className="text-xs text-gray-500">
            Pulau Komodo, Nusa Tenggara Timur
          </div>
          <div className="flex items-center mt-1">
            <div className="flex text-yellow-400">★★★★★</div>
            <span className="text-xs ml-1">4.8 (1.2K+ ulasan)</span>
            <span className="text-xs text-blue-500 ml-2 underline">
              Lihat di Maps
            </span>
          </div>
        </div>
        <div className="h-[288px] relative">
          <div className="absolute inset-0">
            <DynamicMap />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white text-center p-2 text-xs text-gray-500 z-[400]">
            Map data ©2025 OpenStreetMap contributors
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Lokasi</h2>
        <p className="text-gray-700 mb-6">
          Taman Nasional Komodo terletak di antara pulau-pulau utama Sumbawa dan
          Flores di Nusa Tenggara Timur. Taman nasional ini terdiri dari tiga
          pulau utama yaitu Komodo, Rinca dan Padar, serta beberapa pulau kecil
          lainnya. Wilayah taman seluas 1,733 km² dengan dua pertiga diantaranya
          merupakan wilayah laut yang memiliki kekayaan biota laut yang
          menakjubkan.
        </p>
      </div>
    </div>
  );
};

export default Map;
