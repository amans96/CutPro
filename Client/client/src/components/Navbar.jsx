import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Scissors,
  ArrowRight,
  User,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import api from "../services/api";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
    const response = await api.post("/auth/register", {
  name: name.trim(),
  email: email.trim(),
  password,
  role,
});

      console.log("REGISTER SUCCESS:", response.data);

    // Save JWT
    localStorage.setItem("token", response.data.token);

    // Save user
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    // Reset form
    setName("");
    setEmail("");
    setPassword("");
    setRole("");

    // Close signup popup
    setSignupOpen(false);

    // Redirect based on role
    if (role === "SHOP_OWNER") {
      window.location.href = "/ServicesBarbers";
    } else {
      window.location.href = "/Shop";
    }

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    setError(
      err.response?.data?.error ||
      "Something went wrong while creating your account."
    );
  } finally {
    setLoading(false);
  }
};

  const openSignup = () => {
    setError("");
    setSignupOpen(true);
    setMobileOpen(false);
  };

  const closeSignup = () => {
    if (loading) return;

    setSignupOpen(false);
    setError("");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <div className="mx-auto max-w-7xl">

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-5 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">

            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 group"
            >
              <motion.div
                whileHover={{
                  rotate: -10,
                  scale: 1.08,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"
              >
                <Scissors size={21} />
              </motion.div>

              <div className="leading-none">
                <span className="text-xl font-bold tracking-tight text-white">
                  CutPro
                </span>

                <span className="ml-1 text-xl font-bold text-white/40">
                  .
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">

              <a
                href="#features"
                className="text-sm font-medium text-white/60 transition hover:text-white"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-sm font-medium text-white/60 transition hover:text-white"
              >
                How it works
              </a>

              <a
                href="#pricing"
                className="text-sm font-medium text-white/60 transition hover:text-white"
              >
                Pricing
              </a>

            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 md:flex">

              {/* SIGN UP */}
             {token ? (
  <button
    type="button"
    onClick={() => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.role === "SHOP_OWNER") {
        window.location.href = "/owner";
      } else {
        window.location.href = "/shops";
      }
    }}
    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
  >
    Dashboard
  </button>
) : (
  <button
    type="button"
    onClick={openSignup}
    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
  >
    Sign up
  </button>
)}

              {/* GET STARTED */}
              <motion.button
                type="button"
                onClick={openSignup}
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="group flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition"
              >
                Get started

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.button>

            </div>

            {/* Mobile Button */}
            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
            >
              {mobileOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>

          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="mt-2 rounded-2xl border border-white/10 bg-black/95 p-5 backdrop-blur-xl md:hidden"
              >

                <div className="flex flex-col gap-2">

                  <a
                    href="#features"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    Features
                  </a>

                  <a
                    href="#how-it-works"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    How it works
                  </a>

                  <a
                    href="#pricing"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    Pricing
                  </a>

                  <div className="my-2 h-px bg-white/10" />

                  <button
                    type="button"
                    onClick={openSignup}
                    className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    Sign up
                  </button>

                  <button
                    type="button"
                    onClick={openSignup}
                    className="rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-black"
                  >
                    Get started
                  </button>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.nav>

      {/* ================= SIGNUP MODAL ================= */}

      <AnimatePresence>
        {signupOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSignup}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
            />

            {/* Modal Wrapper */}
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 30,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className="pointer-events-auto w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-7 shadow-2xl"
              >

                {/* Modal Header */}
                <div className="mb-7 flex items-start justify-between">

                  <div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
                      <Scissors size={21} />
                    </div>

                    <h2 className="text-2xl font-bold text-white">
                      Create your account
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      Start building your shop with CutPro.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeSignup}
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
                      initial={{
                        opacity: 0,
                        y: -10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form
                  onSubmit={handleSignup}
                  className="space-y-4"
                >

                  {/* Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                      Your name
                    </label>

                    <div className="relative">

                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                      />

                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value)
                        }
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition focus:border-white/40 focus:bg-zinc-900"
                      />

                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                      Email address
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                      />

                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition focus:border-white/40 focus:bg-zinc-900"
                      />

                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-400">
                      Password
                    </label>

                    <div className="relative">

                      <Lock
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                      />

                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition focus:border-white/40 focus:bg-zinc-900"
                      />

                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-bold text-black transition hover:bg-zinc-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
                        <ArrowRight size={17} />
                      </>
                    )}

                  </button>

                </form>

                <p className="mt-5 text-center text-xs text-zinc-600">
                  By creating an account, you agree to our terms
                  and privacy policy.
                </p>

              </motion.div>

            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;