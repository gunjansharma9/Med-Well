import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DoctorCard from './DoctorCard';
import { motion } from 'framer-motion';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext)
  
  return (
    <div className='flex flex-col items-center gap-8 py-16 px-4 sm:px-8 bg-gradient-to-b from-white to-blue-50'>
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='text-center space-y-4 max-w-4xl mx-auto'
      >
        <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>
          Our Expert Medical Team
        </h1>
        <p className='text-gray-600 text-lg sm:text-xl'>
          Connect with highly qualified healthcare professionals dedicated to your well-being
        </p>
      </motion.div>

      {/* Doctors Grid */}
      <div className='w-full max-w-7xl px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
          {doctors.slice(0, 8).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              className='w-full max-w-[300px]'
            >
              <DoctorCard 
                item={item} 
                className='hover:shadow-lg transition-shadow duration-300'
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className='mt-8'
      >
        <button 
          onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
          className='px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full 
          hover:scale-105 transition-all shadow-lg hover:shadow-blue-200 flex items-center gap-2'
        >
          <span>View All Doctors</span>
          <svg 
            className='w-4 h-4' 
            fill='none' 
            stroke='currentColor' 
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </button>
      </motion.div>
    </div>
  )
}

export default TopDoctors