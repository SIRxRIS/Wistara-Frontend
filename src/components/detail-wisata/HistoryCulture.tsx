import React from "react";

export default function HistoryCulture() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
      <div className="bg-green-800 text-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sejarah</h2>
        <p className="text-white/90">
          Taman Nasional Komodo didirikan pada tahun 1980 untuk melindungi
          komodo (Varanus komodoensis) dan habitatnya. Satwa yang hanya
          ditemukan di kawasan ini, biota laut, dan ekosistem berbatu ini adalah
          warisan sejarah alam yang patut dilindungi. Sejak itu, taman nasional
          ini ditunjuk untuk situs Warisan Dunia UNESCO dan Cagar Biosfer.
          Komodo ini selama bertahun-tahun menjadi objek penelitian ilmiah
          beragam karena nilai.
        </p>
      </div>
      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Budaya</h2>
        <p className="text-white/90">
          Penduduk yang tinggal di sekitar Taman Nasional Komodo, sebagian besar
          adalah Bajo dan Manggarai. Mereka memiliki budaya maritim yang kaya
          yang telah berkembang selama berabad-abad. Masyarakat lokal percaya
          bahwa komodo adalah perwujudan dari nenek moyang dengan cerita turun
          temurun mengenai bagaimana manusia dan komodo pernah hidup
          berdampingan dengan damai.
        </p>
      </div>
    </div>
  );
}
