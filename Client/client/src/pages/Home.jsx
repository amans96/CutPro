import Navbar from '../components/Navbar';
import Hero from '../components/Hero.jsx'
import FeaturesWireframe from '../components/FeaturesWireframe.jsx'
export default function Home() {
  return (
    <div className="min-h-screen text-white">
      
      <Navbar />

      <Hero />

      <FeaturesWireframe />

    </div>
  );
}