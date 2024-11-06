import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DoctorCard from './DoctorCard';

const TopDoctors = () => {
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext)
  
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Trusted Doctors Ready to Help</h1>
      <p className='sm:w-1/3 text-center text-sm'>Quickly find and book appointments with top healthcare providers.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {
            doctors.slice(0,10).map((item,index) => (
                <DoctorCard item={item} key={index} />
            ))
        }
      </div>
      <button onClick={() => {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default TopDoctors
