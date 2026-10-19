/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureCoffee } from './components/SignatureCoffee';
import { BrandStory } from './components/BrandStory';
import { CraftSection } from './components/CraftSection';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { MenuPreview } from './components/MenuPreview';
import { LocationsSection } from './components/LocationsSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { TableReservationModal } from './components/TableReservationModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FullMenuModal } from './components/FullMenuModal';
import { SignatureProduct } from './types';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<SignatureProduct | null>(null);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationLocationId, setReservationLocationId] = useState<string | undefined>(undefined);
  const [fullCarteOpen, setFullCarteOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleOpenReservation = (locationId?: string) => {
    setReservationLocationId(locationId);
    setReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0C0A08] text-[#F5F1EA] selection:bg-[#B88746]/40 selection:text-[#FCFAF7] overflow-x-clip">
      {/* 01 - Sticky Brand Navigation */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        onOpenFavorites={() => setFullCarteOpen(true)}
      />

      <main id="main-content">
        {/* 02 - Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('signature')}
          onFindCafeClick={() => scrollToSection('locations')}
        />

        {/* 03 - Signature Coffee Products */}
        <SignatureCoffee
          onSelectProduct={(product) => setSelectedProduct(product)}
          onExploreFullMenu={() => setFullCarteOpen(true)}
        />

        {/* 04 - Brand Story & Philosophy */}
        <BrandStory />

        {/* 05 - The Craft & Four Pillars */}
        <CraftSection />

        {/* 06 - Atmosphere & Inhabited Spaces */}
        <AtmosphereGallery />

        {/* 07 - Curated Menu Preview */}
        <MenuPreview onOpenFullCarte={() => setFullCarteOpen(true)} />

        {/* 08 - Tashkent Locations & Spaces */}
        <LocationsSection onReserveTable={(locId) => handleOpenReservation(locId)} />

        {/* 09 - Closing Call to Action */}
        <CTASection
          onFindCafe={() => scrollToSection('locations')}
          onExploreMenu={() => setFullCarteOpen(true)}
        />
      </main>

      {/* 10 - Minimalist Brand Footer */}
      <Footer />

      {/* Interactive Modals & Slide-overs */}
      <TableReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        initialLocationId={reservationLocationId}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onReserveTasting={() => {
          setSelectedProduct(null);
          handleOpenReservation();
        }}
      />

      <FullMenuModal
        isOpen={fullCarteOpen}
        onClose={() => setFullCarteOpen(false)}
        onReserveTable={() => {
          setFullCarteOpen(false);
          handleOpenReservation();
        }}
      />
    </div>
  );
}
