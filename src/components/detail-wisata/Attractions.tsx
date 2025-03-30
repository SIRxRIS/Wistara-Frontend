import React from "react";
import Image from "next/image";

interface Attraction {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function Attractions() {
  const attractions: Attraction[] = [
    {
      id: 1,
      title: "Pink Beach",
      description:
        "Salah satu pantai yang mengagumkan dengan pasir berwarna merah muda yang terbentuk dari fragmen terumbu karang merah.",
      image: "/images/pantai-komodo.png",
    },
    {
      id: 2,
      title: "Pulau Padar",
      description:
        "Menyajikan pemandangan bukit-bukit yang spektakuler dan teluk berbentuk W yang indah, sempurna untuk hiking dan fotografi.",
      image: "/images/pulau-padar.png",
    },
    {
      id: 3,
      title: "Komodo Dragons",
      description:
        "Hewan Nasional Komodo, kadal raksasa dengan panjang hingga 3 meter. Kesempatan langka untuk melihat reptil purba yang masih ada.",
      image: "/images/komodo.png",
    },
    {
      id: 4,
      title: "Sunset View",
      description:
        "Pulau komodo juga terkenal dengan pemandangan sunset yang luar biasa, terutama dilihat dari bukit di Pulau Padar atau Pink Beach.",
      image: "/images/pulau-kanawa.png",
    },
  ];

  return (
    <div className="py-8">
      <h2 className="text-xl font-bold mb-6">Daya Tarik</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attractions.map((attraction) => (
          <div
            key={attraction.id}
            className="border border-gray-200 rounded-lg overflow-hidden flex"
          >
            <div className="relative w-1/3">
              <Image
                src={attraction.image}
                alt={attraction.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="w-2/3 p-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                  <span className="text-sm">{attraction.id}</span>
                </div>
                <h3 className="font-medium">{attraction.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{attraction.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
