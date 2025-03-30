import React, { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="mt-6">
      {/* Header section with title and buttons */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Taman Nasional Komodo</h1>
        <div className="flex space-x-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? "#FF0000" : "none"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z"
                fill={isFavorite ? "#FF0000" : "none"}
                stroke={isFavorite ? "#FF0000" : "black"}
                strokeWidth="2"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96">
        <div className="col-span-2 row-span-2 relative">
          <Image
            src="/images/pulau-komodo.png"
            alt="Komodo Island"
            fill
            className="object-cover rounded-l-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 relative">
          <Image
            src="/images/pulau-padar.png"
            alt="Komodo Island View"
            fill
            className="object-cover rounded-tr-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 relative">
          <Image
            src="/images/komodo.png"
            alt="Komodo Dragon"
            fill
            className="object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 relative">
          <Image
            src="/images/pantai-komodo.png"
            alt="Komodo Beach"
            fill
            className="object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 relative">
          <Image
            src="/images/laut-komodo.png"
            alt="Komodo Sea"
            fill
            className="object-cover rounded-br-lg"
          />
        </div>
      </div>
    </div>
  );
}
