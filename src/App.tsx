import { MotionConfig } from 'motion/react';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { SearchOverlay } from './components/layout/SearchOverlay';
import { ApplicationSection } from './components/sections/ApplicationSection';
import { BrandCarousel } from './components/sections/BrandCarousel';
import { BulkEnquirySection } from './components/sections/BulkEnquirySection';
import { BuyingGuides } from './components/sections/BuyingGuides';
import { CategoryGrid } from './components/sections/CategoryGrid';
import { FAQAccordion } from './components/sections/FAQAccordion';
import { HeroCarousel } from './components/sections/HeroCarousel';
import { NewsletterSection } from './components/sections/NewsletterSection';
import { OffersSection } from './components/sections/OffersSection';
import { ProductGrid } from './components/sections/ProductGrid';
import { PromotionalBanners } from './components/sections/PromotionalBanners';
import { SmartHomeSection } from './components/sections/SmartHomeSection';
import { TestimonialCarousel } from './components/sections/TestimonialCarousel';
import { TrustStrip } from './components/sections/TrustStrip';
import { BulkEnquiryModal } from './components/shop/BulkEnquiryModal';
import { GuideModal } from './components/shop/GuideModal';
import { CartDrawer, InfoModal, ProductQuickView, ToastNotifications, WishlistDrawer } from './components/shop/Overlays';
import { ShopProvider } from './store/ShopContext';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ShopProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <div id="top" />
        <AnnouncementBar />
        <Header />
        <main id="main">
          <HeroCarousel />
          <TrustStrip />
          <CategoryGrid />
          <ProductGrid />
          <PromotionalBanners />
          <ApplicationSection />
          <SmartHomeSection />
          <BrandCarousel />
          <OffersSection />
          <TestimonialCarousel />
          <BulkEnquirySection />
          <BuyingGuides />
          <FAQAccordion />
          <NewsletterSection />
        </main>
        <Footer />

        <MobileNavigation />
        <SearchOverlay />
        <CartDrawer />
        <WishlistDrawer />
        <ProductQuickView />
        <BulkEnquiryModal />
        <GuideModal />
        <InfoModal />
        <ToastNotifications />
      </ShopProvider>
    </MotionConfig>
  );
}
