import React, { useState } from "react";
import Image from "next/image";

export default function Reviews() {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const ratings = [
    { stars: 5, percentage: 72, count: 864 },
    { stars: 4, percentage: 18, count: 216 },
    { stars: 3, percentage: 6, count: 72 },
    { stars: 2, percentage: 3, count: 36 },
    { stars: 1, percentage: 1, count: 12 },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log({ userRating, reviewText });
    setReviewText("");
    setUserRating(0);
    setShowReviewForm(false);
  };

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
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex items-center bg-white px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <span className="mr-2">Beri Nilai Destinasi Ini</span>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserRating(star);
                    }}
                  >
                    {star <= userRating ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-6 bg-white p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/profile.png"
                  alt="Your Profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="cursor-pointer text-xl"
                      onClick={() => setUserRating(star)}
                    >
                      {star <= userRating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Bagikan pengalaman Anda..."
                className="w-full p-3 border rounded-lg mb-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Kirim Ulasan
                </button>
              </div>
            </form>
          )}

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
