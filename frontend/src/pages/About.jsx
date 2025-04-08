import React from 'react';
import { assets } from '../assets/assets';
import { GiHealthPotion, GiDoctorFace, GiStethoscope } from 'react-icons/gi';
import { FaHandHoldingHeart, FaUserMd, FaClinicMedical } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Intro Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Welcome to MedWell
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Shaping tomorrow’s healthcare by blending innovation with empathy.
        </p>
      </div>

      {/* Image and Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            src={assets.about_image} 
            alt="Medical Team" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <GiHealthPotion className="text-4xl text-blue-600" />
            <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            Established in 2020, MedWell started with a vision to simplify healthcare 
            access through digital solutions. What began as a collaboration between 
            healthcare professionals and tech enthusiasts has grown into a trusted 
            platform helping over half a million people nationwide.
          </p>

          <div className="p-6 bg-blue-50 rounded-xl mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What We Stand For</h3>
            <p className="text-gray-600">
              Our approach centers on <span className="text-blue-600 font-medium">people-driven healthcare</span>, 
              enhanced with smart technology. MedWell connects the dots between compassionate 
              care and digital convenience.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Highlights */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-blue-600 mb-2">2500+</div>
          <div className="text-gray-600">Verified Medical Experts</div>
          <FaUserMd className="text-3xl text-blue-400 mx-auto mt-4" />
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
          <div className="text-gray-600">Positive Patient Feedback</div>
          <FaHandHoldingHeart className="text-3xl text-blue-400 mx-auto mt-4" />
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
          <div className="text-gray-600">Round-the-Clock Assistance</div>
          <FaClinicMedical className="text-3xl text-blue-400 mx-auto mt-4" />
        </div>
      </div>

      {/* Why MedWell Section */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-12">
          <GiStethoscope className="text-4xl text-blue-600" />
          <h2 className="text-3xl font-semibold text-gray-800">Why Trust MedWell</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <GiDoctorFace className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Specialist Network</h3>
            <p className="text-gray-600">
              Connect with top-tier doctors from more than 25 specializations, carefully selected for your care.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="text-4xl text-blue-600 mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Lightning-Fast Access</h3>
            <p className="text-gray-600">
              Book appointments within seconds with smart scheduling and live confirmation.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="text-4xl text-blue-600 mb-4">🛡️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Safety First</h3>
            <p className="text-gray-600">
              We guard your health data using top-level encryption and tamper-proof technology.
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            “At MedWell, we’re committed to reshaping how healthcare works. By integrating advanced digital tools with 
            compassionate service, we aim to empower both patients and practitioners in every interaction.”
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;
