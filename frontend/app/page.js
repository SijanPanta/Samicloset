import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NewArrivals from '@/components/NewArrivals';
import Philosophy from '@/components/Philosophy';
import FeaturedStory from '@/components/FeaturedStory';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Hero />
        <NewArrivals />
        <Philosophy />
        <FeaturedStory />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
