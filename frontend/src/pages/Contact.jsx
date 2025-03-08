import React from 'react';
import { assets } from '../assets/assets';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Get in Touch
          </span>
        </h1>
        <p className="text-lg text-gray-600">We're here to help and answer any questions you might have</p>
      </motion.div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Side - Contact Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
        >
          <img 
            className="w-full h-full object-cover"
            src={assets.contact_image} 
            alt="Contact MedWell" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </motion.div>

        {/* Right Side - Contact Information */}
        <div className="space-y-8">
          {/* Office Address */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaMapMarkerAlt className="text-3xl text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Our Headquarters</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">MedWell Health Solutions Pvt. Ltd.</p>
              <p>123, Green Valley Road<br/>
              Sector 45, Noida<br/>
              Uttar Pradesh, India - 201301</p>
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaPhone className="text-xl text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-gray-600">+91 98765 00000</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-xl text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">contact@medwellhealth.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Careers Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Team</h2>
            <p className="text-gray-600 mb-6">
              We're always looking for passionate healthcare professionals and tech innovators 
              to join our mission.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-lg 
              font-medium hover:shadow-lg transition-all"
            >
              View Open Positions
            </motion.button>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6 mt-8"
          >
            <FaLinkedin className="text-3xl text-blue-600 hover:text-blue-700 cursor-pointer transition-colors" />
            <FaTwitter className="text-3xl text-blue-600 hover:text-blue-700 cursor-pointer transition-colors" />
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-20 bg-white rounded-2xl shadow-xl p-8 md:p-12"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-4">
            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-lg 
              font-medium hover:shadow-lg transition-all float-right"
            >
              Send Message
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Contact;