import React from "react";

export default function SimilarPlaces() {
  const places = [
    {
      id: 1,
      name: "Raja Ampat",
      location: "Papua Barat",
      rating: 4.9,
      image: "/images/raja-ampat.png",
    },
    {
      id: 2,
      name: "Labuan Bajo",
      location: "Nusa Tenggara Timur",
      rating: 4.7,
      image: "/images/pantai-komodo.png",
    },
    {
      id: 3,
      name: "Gunung Bromo",
      location: "Jawa Timur",
      rating: 4.8,
      image: "/images/bromo.png",
    },
    {
      id: 4,
      name: "Bali",
      location: "Pulau Dewata",
      rating: 4.9,
      image: "/images/pura-ulun.png",
    },
  ];

  return (
    <div className="py-8">
      <h2 className="text-xl font-bold mb-6">Wisata Serupa</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {places.map((place) => (
          <div
            key={place.id}
            className="rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="h-36">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium">{place.name}</h3>
              <p className="text-xs text-gray-500">{place.location}</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400 font-medium mr-1 text-sm">
                  {place.rating}
                </span>
                <svg
                  className="h-4 w-4 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
