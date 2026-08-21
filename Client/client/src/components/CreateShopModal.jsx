import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Store,
  Phone,
  Scissors,
  MapPin,
  Loader2,
} from "lucide-react";
import api from "../services/api";

export default function CreateShopModal({
  isOpen,
  onClose,
  onCreated,
}) {
  const [shopName, setShopName] = useState("");
  const [businessType, setBusinessType] = useState("BARBERSHOP");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const shopData = {
      shopName: shopName.trim(),
      businessType,
      shopPhone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      country: country.trim(),
    };

    try {
      const response = await api.post("/shops", shopData);

      console.log("SHOP CREATED:", response.data);

      // Send created shop back to parent if provided
      if (onCreated) {
        onCreated(response.data);
      }

      // Reset form
      setShopName("");
      setBusinessType("BARBERSHOP");
      setPhone("");
      setAddress("");
      setCity("");
      setCountry("");

      // Close modal
      onClose();

    } catch (err) {
      console.error("CREATE SHOP ERROR:", err);

      const message =
        err.response?.data?.error ||
        "Failed to create shop. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!loading ? onClose : undefined}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl pointer-events-auto my-8"
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Create your shop
                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">
                    Get your business online in seconds.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="rounded-full bg-zinc-900 p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:opacity-40"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Shop Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                    Shop Name
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                      <Store size={18} />
                    </div>

                    <input
                      type="text"
                      required
                      value={shopName}
                      onChange={(e) =>
                        setShopName(e.target.value)
                      }
                      placeholder="e.g. Elite Cuts"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition focus:border-amber-500 focus:bg-zinc-900 focus:ring-1 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                {/* Business Type */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                    Business Type
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                      <Scissors size={18} />
                    </div>

                    <select
                      value={businessType}
                      onChange={(e) =>
                        setBusinessType(e.target.value)
                      }
                      className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white outline-none transition focus:border-amber-500 focus:bg-zinc-900 focus:ring-1 focus:ring-amber-500/50"
                    >
                      <option value="BARBERSHOP">
                        Barbershop
                      </option>

                      <option value="SALON">
                        Hair Salon
                      </option>

                      <option value="NAIL_SALON">
                        Nail Salon
                      </option>

                      <option value="SPA">
                        Spa
                      </option>
                    </select>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                    Phone Number
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                      <Phone size={18} />
                    </div>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="+251 9XX XXX XXX"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition focus:border-amber-500 focus:bg-zinc-900 focus:ring-1 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                    Address
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                      <MapPin size={18} />
                    </div>

                    <input
                      type="text"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      placeholder="Bole, Main Street"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition focus:border-amber-500 focus:bg-zinc-900 focus:ring-1 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                {/* City + Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                      City
                    </label>

                    <input
                      type="text"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      placeholder="Addis Ababa"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-amber-500 focus:bg-zinc-900 focus:ring-1 focus:ring-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                      Country
                    </label>

                    <input
                      type="text"
                      value={country}
                      onChange={(e) =>
                        setCountry(e.target.value)
                      }
                      placeholder="Ethiopia"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 px-4 text-white placeholder-zinc-600 outline-none transition focus:border-amber-500 focus:bg-zinc-900 focus:ring-1 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 font-bold text-black transition hover:bg-amber-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Creating shop...
                    </>
                  ) : (
                    "Create Shop"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}