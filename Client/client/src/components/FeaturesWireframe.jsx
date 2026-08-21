import { motion } from "framer-motion";
import {
  QrCode,
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  CalendarCheck,
  Scissors
} from "lucide-react";

export default function FeaturesBento() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="bg-black py-24 px-6 font-sans text-white">
      
      {/* HEADER */}
      <div className="mx-auto max-w-4xl text-center mb-16">
        <span className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-4 inline-block">
          Why CutPro?
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Everything your shop needs.
        </h2>
      </div>

      {/* BENTO GRID */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        
        {/* CARD 1: QR (col-span-1) */}
        <motion.div variants={item} className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-amber-500/5">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-zinc-800 bg-black px-3 py-1 text-xs font-semibold text-zinc-400">
              For Customers
            </div>
            <h3 className="text-xl font-bold text-white mb-2">QR Experience</h3>
            <p className="text-sm text-zinc-500 mb-8 transition-colors group-hover:text-zinc-400">Customers scan the code at your shop to instantly join the waitlist.</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-black p-4 border border-zinc-800 transition-colors group-hover:border-zinc-700">
            <QrCode className="text-amber-500 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110" size={24} />
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
              Scan <ArrowRight size={14} className="text-amber-500 transition-transform duration-300 group-hover:translate-x-1" /> Join
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Queue (col-span-2) */}
        <motion.div variants={item} className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 md:col-span-2 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-amber-500/5">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-zinc-800 bg-black px-3 py-1 text-xs font-semibold text-zinc-400">
              For Customers & Staff
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Live Queue</h3>
            <p className="text-sm text-zinc-500 max-w-md transition-colors group-hover:text-zinc-400">Everyone sees exactly where they stand in real-time, eliminating the "how much longer?" questions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { num: "01", name: "John Doe", status: "In chair", active: true },
              { num: "02", name: "Michael", status: "Next up", active: false },
              { num: "03", name: "Alex B.", status: "18 min", active: false }
            ].map((person, i) => (
              <div key={i} className={`flex flex-col rounded-2xl p-4 border transition-transform duration-300 group-hover:-translate-y-1 ${person.active ? 'bg-amber-500/10 border-amber-500/20' : 'bg-black border-zinc-800'}`} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-black ${person.active ? 'text-amber-500' : 'text-zinc-500'}`}>#{person.num}</span>
                  {person.active && <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
                </div>
                <span className="font-bold text-white mb-1">{person.name}</span>
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  {!person.active && <Clock size={10} />} {person.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CARD 3: Dashboard (col-span-2) */}
        <motion.div variants={item} className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 md:col-span-2 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-amber-500/5">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-zinc-800 bg-black px-3 py-1 text-xs font-semibold text-zinc-400">
              For Owners
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Shop Dashboard</h3>
            <p className="text-sm text-zinc-500 max-w-md transition-colors group-hover:text-zinc-400">Track your shop's performance, daily revenue, and customer flow all in one place.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 rounded-2xl bg-black p-6 border border-zinc-800 text-center transition-colors group-hover:border-zinc-700">
             <div>
               <DollarSign size={16} className="text-amber-500 mx-auto mb-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
               <div className="text-2xl font-black text-white">$12.4k</div>
               <div className="text-xs font-medium text-zinc-500 mt-1">Revenue</div>
             </div>
             <div className="border-x border-zinc-800">
               <Users size={16} className="text-amber-500 mx-auto mb-2 transition-transform duration-300 delay-75 group-hover:-translate-y-1 group-hover:scale-110" />
               <div className="text-2xl font-black text-white">1,284</div>
               <div className="text-xs font-medium text-zinc-500 mt-1">Customers</div>
             </div>
             <div>
               <CalendarCheck size={16} className="text-amber-500 mx-auto mb-2 transition-transform duration-300 delay-150 group-hover:-translate-y-1 group-hover:scale-110" />
               <div className="text-2xl font-black text-white">48</div>
               <div className="text-xs font-medium text-zinc-500 mt-1">Today</div>
             </div>
          </div>
        </motion.div>

        {/* CARD 4: Team (col-span-1) */}
        <motion.div variants={item} className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-amber-500/5">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-zinc-800 bg-black px-3 py-1 text-xs font-semibold text-zinc-400">
              For Owners
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Team Sync</h3>
            <p className="text-sm text-zinc-500 transition-colors group-hover:text-zinc-400">Manage your barbers and their unique schedules seamlessly.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['John', 'Michael', 'Daniel'].map((name, i) => (
              <div key={name} className="flex cursor-default items-center gap-2 rounded-full bg-black border border-zinc-800 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-amber-500/50 hover:bg-zinc-900">
                <Scissors size={14} className="text-amber-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" style={{ transitionDelay: `${i * 50}ms` }} /> {name}
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>

      {/* CTA SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mx-auto max-w-xl text-center mt-24"
      >
        <h3 className="text-3xl font-black text-white mb-6">Ready to run your shop?</h3>
        <a
          href="/register"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-base font-bold text-black transition-all hover:bg-amber-400 hover:scale-105"
        >
          Get Started <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>

    </section>
  );
}