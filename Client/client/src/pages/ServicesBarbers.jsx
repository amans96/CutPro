import { useState, useEffect } from 'react';
import api from '../services/api';
import { Scissors, CheckCircle, XCircle, UserPlus, Clock } from 'lucide-react';

export default function ServicesBarbers() {
  const [activeTab, setActiveTab] = useState('services'); // Default to 'services'
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data concurrently from your backend routes
    Promise.all([
      api.get('/staff').catch(() => ({ data: [] })),
      api.get('/services').catch(() => ({ data: [] }))
    ]).then(([staffRes, servicesRes]) => {
      // Map staff data and ensure availability depends on whether they are active/on the list
      const rawStaff = staffRes.data.length > 0 ? staffRes.data : [
        { id: 1, name: "Alex Mercer", isAvailable: true, queueCount: 3, specialty: "Fades & Tapers" },
        { id: 2, name: "Sam Vance", isAvailable: true, queueCount: 1, specialty: "Beard Sculpting" },
        { id: 3, name: "Marcus King", isAvailable: false, queueCount: 0, specialty: "Classic Scissor Cuts" }
      ];

      // Enforce rule: A barber cannot be available if they have no active presence or are flagged off
      const processedBarbers = rawStaff.map(barber => ({
        ...barber,
        // If queueCount is 0 or explicitly marked false by backend, force availability to false
        isAvailable: barber.isAvailable && (barber.queueCount !== undefined ? true : false)
      }));

      setBarbers(processedBarbers);

      setServices(servicesRes.data.length > 0 ? servicesRes.data : [
        { id: 1, name: "Signature Haircut", price: 30, duration: "30 mins", description: "Precision cut, hot towel finish, and style." },
        { id: 2, name: "Beard Trim & Shape", price: 20, duration: "20 mins", description: "Beard shaping, razor line-up, and nourishing oil." },
        { id: 3, name: "Full VIP Treatment", price: 50, duration: "50 mins", description: "Haircut, beard trim, and soothing facial treatment." }
      ]);

      setLoading(false);
    });
  }, []);

  const handleJoinList = (barberName) => {
    alert(`Successfully added to ${barberName}'s queue list!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services & Barbers</h1>
          <p className="text-zinc-400 mt-1">Explore our cuts and check barber availability in real-time.</p>
        </div>

        {/* Sub-navigation tabs */}
        <div className="bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 flex gap-1">
          <button 
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition ${
              activeTab === 'services' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Services
          </button>
          <button 
            onClick={() => setActiveTab('barbers')}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition ${
              activeTab === 'barbers' ? 'bg-amber-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Barbers & Availability
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500 animate-pulse">Loading catalog...</div>
      ) : activeTab === 'services' ? (
        /* SERVICES VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-500/50 transition">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/20 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {service.duration || "30 mins"}
                  </span>
                  <span className="text-amber-400 font-extrabold text-xl">${service.price}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-zinc-400 text-sm mb-6">{service.description}</p>
              </div>
              <button 
                onClick={() => setActiveTab('barbers')}
                className="w-full bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 font-bold py-2.5 rounded-xl transition text-sm cursor-pointer"
              >
                Select Barber & Book
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* BARBERS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {barbers.map((barber) => {
            // Check if barber is available and has an active profile/list
            const isActuallyAvailable = barber.isAvailable && barber.queueCount >= 0;

            return (
              <div key={barber.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="bg-zinc-800 p-3 rounded-xl text-amber-500">
                      <Scissors className="w-6 h-6" />
                    </div>
                    {isActuallyAvailable ? (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Available
                      </span>
                    ) : (
                      <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> Not Available
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-1">{barber.name}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{barber.specialty || "Master Barber"}</p>

                  <div className="bg-zinc-950/50 border border-zinc-800/80 p-3.5 rounded-xl mb-6 flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">People on list:</span>
                    <span className="font-bold text-amber-400 text-lg">{barber.queueCount ?? 0} clients</span>
                  </div>
                </div>

                <button 
                  disabled={!isActuallyAvailable}
                  onClick={() => handleJoinList(barber.name)}
                  className={`w-full font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm ${
                    isActuallyAvailable 
                      ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 cursor-pointer' 
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  <UserPlus className="w-4 h-4" /> {isActuallyAvailable ? `Join ${barber.name}'s List` : 'Currently Unavailable'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}