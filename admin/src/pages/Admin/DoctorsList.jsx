import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='mx-5 my-8'>
      <h2 className='text-2xl font-semibold text-slate-800 mb-6'>Medical Practitioners</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {doctors.map((item, index) => (
          <div 
            key={item._id}
            className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden group'
          >
            {/* Doctor Image */}
            <div className='relative overflow-hidden'>
              <img 
                className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                src={item.image} 
                alt={`Dr. ${item.name}`}
              />
              <span className='absolute bottom-2 right-2 px-3 py-1 rounded-full bg-white/90 text-slate-600 text-sm shadow-sm'>
                {item.speciality}
              </span>
            </div>

            {/* Doctor Details */}
            <div className='p-4 space-y-3'>
              <div>
                <h3 className='text-lg font-semibold text-slate-800'>{item.name}</h3>
                <p className='text-sm text-slate-500'>{item.experience} Experience</p>
              </div>

              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-slate-600'>Consultation Fee</p>
                  <p className='text-lg font-medium text-emerald-600'>₹{item.fees}</p>
                </div>
                
                {/* Availability Toggle */}
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    className='sr-only'
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    item.available ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                      item.available ? 'translate-x-5' : ''
                    }`} />
                  </div>
                </label>
              </div>

              {/* Availability Status */}
              <div className='flex items-center gap-2 text-sm'>
                <span className={`w-2 h-2 rounded-full ${
                  item.available ? 'bg-emerald-500' : 'bg-red-500'
                }`} />
                <span className={item.available ? 'text-emerald-600' : 'text-red-600'}>
                  {item.available ? 'Available Now' : 'Currently Unavailable'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList