import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Speciality = () => {
  return (
    <div className='flex flex-col items-center gap-8 py-16 px-4 sm:px-8 bg-gradient-to-b from-white to-blue-50' id='speciality'>
      
      {/* Intro Section */}
      <motion.div
        className='text-center space-y-4 max-w-4xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>
          Specialized Medical Expertise
        </h1>
        <p className='text-gray-600 text-lg sm:text-xl'>
          Browse through a variety of medical domains and find the right specialist for you.
        </p>
      </motion.div>

      {/* Speciality Cards */}
      <div className='w-full max-w-7xl px-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center'>
          {specialityData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              className='w-full max-w-[200px]'
            >
              <Link
                to={`/doctors/${item.speciality}`}
                onClick={() => window.scrollTo(0, 0)}
                className='group flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2'
              >
                <div className='mb-3 p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors'>
                  <img 
                    src={item.image} 
                    alt={item.speciality} 
                    className='w-14 h-14 sm:w-16 sm:h-16 object-contain' 
                  />
                </div>
                <p className='text-sm font-medium text-gray-800 group-hover:text-blue-600 text-center'>
                  {item.speciality}
                </p>
                <div className='mt-1 w-6 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity' />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Button to View All */}
      <motion.div
        className='mt-8'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Link
          to="/doctors"
          onClick={() => window.scrollTo(0, 0)}
          className='px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg'
        >
          Browse All Specialities
        </Link>
      </motion.div>
    </div>
  );
};

export default Speciality;
