"use client";

import React, { useState } from "react";
import Navbar from "@/components/detail-wisata/Navbar";
import HeroSection from "@/components/detail-wisata/HeroSection";
import Tabs from "@/components/detail-wisata/Tabs";
import Description from "@/components/detail-wisata/Description";
import HistoryCulture from "@/components/detail-wisata/HistoryCulture";
import Attractions from "@/components/detail-wisata/Attractions";
import Facilities from "@/components/detail-wisata/Facilities";
import Map from "@/components/detail-wisata/Map";
import Reviews from "@/components/detail-wisata/Reviews";
import SimilarPlaces from "@/components/detail-wisata/SimilarPlaces";

export default function WisataPage() {
  const [activeTab, setActiveTab] = useState("deskripsi");

  const renderTabContent = () => {
    switch (activeTab) {
      case "deskripsi":
        return (
          <>
            <Description />
            <HistoryCulture />
          </>
        );
      case "daya-tarik":
        return <Attractions />;
      case "fasilitas":
        return <Facilities />;
      case "lokasi":
        return <Map />;
      case "ulasan":
        return <Reviews />;
      case "wisata-serupa":
        return <SimilarPlaces />;
      default:
        return <Description />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <HeroSection />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
}
