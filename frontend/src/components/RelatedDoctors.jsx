import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import DoctorCard from './DoctorCard'
import { FiArrowRight } from 'react-icons/fi'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDocs] = useState([])

  useEffect(() => {
    if(doctors.length > 0 && speciality){
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDocs(doctorsData)
    }
  },[doctors, speciality, docId])

  return (
    <div className='w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-bold text-gray-900 mb-3'>
            Related Specialists
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Explore other top-rated {speciality} specialists available for consultation
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {relDoc.slice(0,4).map((item, index) => (
            <DoctorCard item={item} key={index} />
          ))}
        </div>

        {relDoc.length > 4 && (
          <div className='mt-12 text-center'>
            <button 
              onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
              className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full 
                        font-medium transition-colors duration-200 transform hover:scale-105'
            >
              View All Doctors
              <FiArrowRight className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RelatedDoctors