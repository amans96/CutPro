import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CreateShopModal from "./CreateShopModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-24 lg:py-32">
        
        {/* Subtle Background Glow - moved slightly left to highlight text */}
        <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-amber-500/10 blur-[150px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT COLUMN: Text & Buttons */}
          <div className="max-w-2xl">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-400"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              Built for modern barbershops & salons
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Run your shop <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                like a business.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400 sm:text-xl"
            >
              CutPro gives you everything you need to manage customers, live queues, staff, and sales in one powerfully simple platform.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 font-bold text-black transition hover:bg-amber-400 sm:w-auto"
              >
                Start your shop
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={18}
                />
              </button>

              <a
                href="#product"
                className="flex w-full items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 px-8 py-4 font-bold text-white backdrop-blur-sm transition hover:border-zinc-600 hover:bg-zinc-800 sm:w-auto"
              >
                See how it works
              </a>
            </motion.div>
            
          </div>

          {/* RIGHT COLUMN: SaaS Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            {/* Decorative outline ring behind the image */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-amber-500/20 to-transparent blur-xl" />
            
            {/* Browser Window Frame */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
              
              {/* Fake Browser Top Bar */}
              <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-zinc-700" />
                <span className="h-3 w-3 rounded-full bg-zinc-700" />
                <span className="h-3 w-3 rounded-full bg-zinc-700" />
                <div className="ml-4 flex-1 rounded-md bg-black/50 px-3 py-1 text-xs text-zinc-500 max-w-[200px]">
                  app.cutpro.com
                </div>
              </div>

              {/* Application Screenshot */}
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
                alt="CutPro Barber SaaS Dashboard"
                className="w-full object-cover opacity-80 transition-opacity duration-500 hover:opacity-100"
              />
              
              {/* Subtle overlay gradient to blend with dark mode */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Modal Component Mount */}
      <CreateShopModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}