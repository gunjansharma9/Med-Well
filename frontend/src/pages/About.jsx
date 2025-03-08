import React from 'react';
import { assets } from '../assets/assets';
import { GiHealthPotion, GiDoctorFace, GiStethoscope } from 'react-icons/gi';
import { FaHandHoldingHeart, FaUserMd, FaClinicMedical } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            About MedWell
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pioneering the future of accessible healthcare through innovation and compassion
        </p>
      </div>

      {/* Main Content Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            src={assets.about_image} 
            alt="Healthcare Team" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <GiHealthPotion className="text-4xl text-blue-600" />
            <h2 className="text-3xl font-semibold text-gray-800">Our Journey</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, MedWell emerged from a simple yet powerful vision: to transform healthcare 
            accessibility through technology. What began as a startup project between medical professionals 
            and tech innovators has grown into a platform serving over 500,000 patients nationwide.
          </p>

          <div className="p-6 bg-blue-50 rounded-xl mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Core Philosophy</h3>
            <p className="text-gray-600">
              We believe in <span className="text-blue-600 font-medium">patient-first care</span> enhanced by 
              technology, not replaced by it. Our platform bridges the gap between traditional healthcare values 
              and modern digital convenience.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-blue-600 mb-2">2500+</div>
          <div className="text-gray-600">Certified Specialists</div>
          <FaUserMd className="text-3xl text-blue-400 mx-auto mt-4" />
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
          <div className="text-gray-600">Patient Satisfaction</div>
          <FaHandHoldingHeart className="text-3xl text-blue-400 mx-auto mt-4" />
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
          <div className="text-gray-600">Service Availability</div>
          <FaClinicMedical className="text-3xl text-blue-400 mx-auto mt-4" />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-12">
          <GiStethoscope className="text-4xl text-blue-600" />
          <h2 className="text-3xl font-semibold text-gray-800">Why Choose MedWell</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <GiDoctorFace className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Expert Care Network</h3>
            <p className="text-gray-600">
              Access to rigorously vetted medical professionals across 25+ specialties, 
              ensuring you receive care from qualified experts.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="text-4xl text-blue-600 mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Instant Connectivity</h3>
            <p className="text-gray-600">
              Real-time appointment management with 90-second average booking confirmation 
              and smart calendar integration.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="text-4xl text-blue-600 mb-4">🛡️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Ecosystem</h3>
            <p className="text-gray-600">
              Military-grade encryption for health data with blockchain-backed medical 
              record integrity protection.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
          <p className="text-lg leading-relaxed">
            "At MedWell, we're revolutionizing healthcare accessibility by combining 
            cutting-edge technology with human-centered design. Our mission is to 
            empower patients and providers through seamless digital integration while 
            preserving the essential human connection at the heart of healthcare."
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;