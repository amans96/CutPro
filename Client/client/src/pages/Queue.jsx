import { Link } from 'react-router-dom';
import { Scissors, Users, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Professional Barbershop Management
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight mt-4 mb-6">
          Elevate Your Shop With <span className="text-amber-500">CutPro</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Manage live customer queues, track professional grooming inventory, and deliver a world-class client experience.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/queue" 
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3.5 rounded-xl transition flex items-center gap-2"
          >
            View Live Queue <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/store" 
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 font-bold px-6 py-3.5 rounded-xl transition"
          >
            Browse Store
          </Link>
        </div>
      </div>

      {/* Quick Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-500 mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Live Queue</h3>
          <p className="text-zinc-400 text-sm">Track walk-ins, assign barbers in real-time, and keep wait times low.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-500 mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Shop Inventory</h3>
          <p className="text-zinc-400 text-sm">Sell pomades, oils, and styling merch directly through your integrated store.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-500 mb-4">
            <Scissors className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Staff & Services</h3>
          <p className="text-zinc-400 text-sm">Manage active barbers, working hours, and custom haircut pricing effortlessly.</p>
        </div>
      </div>
    </div>
  );
}