import { Element } from 'react-scroll';
import React, { Suspense, lazy } from 'react';
import SEO from '../common/SEO';

// Lazy load each section
const Hero = lazy(() => import('./sections/Hero'));

const MartialCulture = lazy(() => import('./sections/MartialCulture'));
const FeaturedHighlights = lazy(() => import('./sections/FeaturedHighlights'));
const FaqTriviaSection = lazy(() => import('./sections/FaqTriviaSection'));
const QuoteSection = lazy(() => import('./sections/QuoteSection'));
const CinematicCTA = lazy(() => import('./sections/CinematicCTA'));

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      {/* SEO Metadata */}
      <SEO
        title="MartialVerse: Explore Martial Arts Globally"
        description="MartialVerse is your global hub to discover blogs, videos, and playlists about martial arts, their cultures, techniques, and philosophy."
        keywords="martial arts, Karate, Taekwondo, Kung Fu, Muay Thai, Judo, MMA, martial blogs, fighting styles, combat training, martial art videos"
        image="https://martialverse.vercel.app/logo.png"
        url="https://martialverse.vercel.app/"
        author="MartialVerse Team"
        type="website"
      />

      <Suspense fallback={<div className="text-center py-10">Loading section...</div>}>
        {/* Hero Section */}
        <Element name="hero">
          <Hero />
        </Element>

        <Element name="culture">
          <MartialCulture />
        </Element>

        <Element name="highlights">
          <FeaturedHighlights />
        </Element>

        <Element name="quotes">
          <QuoteSection />
        </Element>

        <Element name="cta">
          <CinematicCTA />
        </Element>

        <Element name="faq">
          <FaqTriviaSection />
        </Element>


      </Suspense>
    </div>
  );
};

export default Home;
