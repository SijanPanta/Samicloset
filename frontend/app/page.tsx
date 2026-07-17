import Hero from '@/components/Hero';
import NewArrivals from '@/components/NewArrivals';
import Philosophy from '@/components/Philosophy';
import FeaturedStory from '@/components/FeaturedStory';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Philosophy />
      <FeaturedStory />
      <Newsletter />
    </>
  );
}
