"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Subscribe for Free Tech & Marketing Tips
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get the latest insights, trends, and strategies delivered to your inbox
          </p>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email address"
                className={`flex-1 px-6 py-4 bg-white/10 border ${
                  status === "error" ? "border-red-500" : "border-white/20"
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors`}
                disabled={status === "loading" || status === "success"}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {status === "loading" ? (
                  "Subscribing..."
                ) : status === "success" ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            {status === "error" && (
              <p className="text-red-400 text-sm mt-2 text-left">
                Please enter a valid email address
              </p>
            )}
            {status === "success" && (
              <p className="text-green-400 text-sm mt-2">
                Thank you for subscribing! Check your inbox for confirmation.
              </p>
            )}
          </form>

          <p className="text-gray-500 text-sm mt-6">
            You don't have to go through your business struggles alone. Reach out today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}