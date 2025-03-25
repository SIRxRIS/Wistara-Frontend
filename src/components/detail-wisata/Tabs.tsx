import React, { useState } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs = [
    { id: "deskripsi", label: "Deskripsi" },
    { id: "daya-tarik", label: "Daya Tarik" },
    { id: "fasilitas", label: "Fasilitas" },
    { id: "lokasi", label: "Lokasi" },
    { id: "ulasan", label: "Ulasan" },
    { id: "wisata-serupa", label: "Wisata Serupa" },
  ];

  return (
    <div className="border-b border-gray-200 mt-6">
      <div className="flex overflow-x-auto space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 px-1 text-sm font-medium ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
