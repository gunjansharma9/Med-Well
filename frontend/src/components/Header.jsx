import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles Animation */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-full bg-blue-100 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Content */}
        <motion.div 
          className="flex flex-col md:w-1/2 gap-6 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Main Heading */}
          <motion.div className="overflow-hidden">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.3
              }}
            >
              <motion.span
                className="block mb-3"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                Instant Medical
              </motion.span>
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  delay: 0.5,
                  stiffness: 120
                }}
              >
                Appointments
              </motion.span>
              <motion.span
                className="block mt-4 text-2xl md:text-3xl text-slate-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Book. Confirm. Get Well.
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Animated Subheading */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-lg text-slate-600 leading-relaxed"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity
              }}
            >
              Secure your slot with certified doctors in seconds
            </motion.p>
          </motion.div>

          {/* Enhanced Animated CTA Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.a
              href="#speciality"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button Content */}
              <span className="relative z-10">Book Appointment Now</span>
              <motion.svg
                className="w-6 h-6 ml-3 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  x: [0, 5, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>

              {/* Button Animations */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-white/30 rounded-lg"
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="md:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative group">
            <motion.img
              src={assets.header_img}
              alt="Appointment Booking"
              className="rounded-xl shadow-xl transform transition-transform duration-500 group-hover:scale-105"
              initial={{ rotate: 2 }}
              animate={{
                rotate: [0, 1, -1, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Animated Success Badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-md border border-blue-100"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                delay: 1
              }}
            >
              <span className="text-blue-600 font-semibold text-sm flex items-center">
                <motion.svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
                Confirmed!
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
