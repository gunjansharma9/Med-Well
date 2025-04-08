import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard';
import { FiArrowRight } from 'react-icons/fi';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);

  useEffect(() => {
    if (doctors.length && speciality) {
      const filtered = doctors.filter(
        (doctor) => doctor.speciality === speciality && doctor._id !== docId
      );
      setSuggestedDoctors(filtered);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-semibold text-gray-900 mb-3'>
            Similar Specialists
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Check out more highly-rated {speciality} professionals for your needs
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {suggestedDoctors.slice(0, 4).map((doctor, idx) => (
            <DoctorCard key={idx} item={doctor} />
          ))}
        </div>

        {suggestedDoctors.length > 4 && (
          <div className='mt-12 text-center'>
            <button
              onClick={() => {
                navigate('/doctors');
                window.scrollTo(0, 0);
              }}
              className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition duration-200 transform hover:scale-105'
            >
              View All Doctors
              <FiArrowRight className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctors;
