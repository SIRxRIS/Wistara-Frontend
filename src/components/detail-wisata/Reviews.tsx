import React from "react";
import Image from "next/image";

export default function Reviews() {
  const ratings = [
    { stars: 5, percentage: 72, count: 864 },
    { stars: 4, percentage: 18, count: 216 },
    { stars: 3, percentage: 6, count: 72 },
    { stars: 2, percentage: 3, count: 36 },
    { stars: 1, percentage: 1, count: 12 },
  ];

  return (
    <div className="py-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Ulasan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            {ratings.map((rating) => (
              <div key={rating.stars} className="flex items-center mb-2">
                <span className="w-4 text-sm">{rating.stars}</span>
                <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{rating.count}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold">4.6</div>
            <div className="flex text-yellow-400 my-2">★★★★★</div>
            <div className="text-sm text-gray-500">3,934 Ulasan</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Komentar</h3>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg">
              <span className="mr-2">Beri Nilai Destinasi Ini</span>
              <div className="flex text-yellow-400">☆☆☆☆☆</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-start mb-3">
              <Image
                src="/images/profile.png"
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              />
              <div>
                <h4 className="font-medium">Susan123</h4>
                <div className="flex text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Taman Nasional Komodo adalah destinasi yang luar biasa! Saya
              sangat terkesan dengan keindahan alamnya. Melihat komodo secara
              langsung adalah pengalaman yang tak terlupakan. Pemandu wisata
              sangat ramah dan profesional. Tempat untuk snorkeling juga sangat
              indah. Pengalaman yang tak terlupakan!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
