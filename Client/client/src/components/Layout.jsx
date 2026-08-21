import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-zinc-950">
      <Navbar />
      <main>
        <Outlet /> {/* This renders whatever current page route you are on */}
      </main>
    </div>
  );
}