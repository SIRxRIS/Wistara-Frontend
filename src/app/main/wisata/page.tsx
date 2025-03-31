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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(sectionId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <HeroSection />
        <Tabs activeTab={activeTab} setActiveTab={scrollToSection} />
        
        <div id="deskripsi" className="scroll-mt-20">
          <Description />
          <HistoryCulture />
        </div>

        <div id="daya-tarik" className="scroll-mt-20">
          <Attractions />
        </div>

        <div id="fasilitas" className="scroll-mt-20">
          <Facilities />
        </div>

        <div id="lokasi" className="scroll-mt-20">
          <Map />
        </div>

        <div id="ulasan" className="scroll-mt-20">
          <Reviews />
        </div>

        <div id="wisata-serupa" className="scroll-mt-20">
          <SimilarPlaces />
        </div>
      </div>
    </div>
  );
}
