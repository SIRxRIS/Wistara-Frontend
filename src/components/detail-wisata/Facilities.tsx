import React from "react";

export default function Facilities() {
  const facilities = [
    { id: 1, name: "Hotel", icon: "🏨" },
    { id: 2, name: "Area Parkir", icon: "🅿️" },
    { id: 3, name: "Persinggahan Kapal", icon: "🚢" },
    { id: 4, name: "Toilet", icon: "🚻" },
    { id: 5, name: "Pemandu Wisata", icon: "👨‍🏫" },
  ];

  return (
    <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img
          src="/images/komodo.png"
          alt="Komodo Dragon"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-6">Fasilitas</h2>
        <div className="space-y-4">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="flex items-center p-3 border border-gray-200 rounded-lg"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3">
                <span>{facility.icon}</span>
              </div>
              <span>{facility.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
