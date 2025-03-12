import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-7xl mx-5 my-8'>
      <h2 className='mb-6 text-2xl font-semibold text-slate-800'>Appointment Management</h2>

      <div className='bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[50px_1.5fr_0.8fr_1.5fr_1.5fr_1fr_120px] gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200'>
          <span className='text-sm font-medium text-slate-500'>#</span>
          <span className='text-sm font-medium text-slate-500'>Patient</span>
          <span className='text-sm font-medium text-slate-500'>Age</span>
          <span className='text-sm font-medium text-slate-500'>Schedule</span>
          <span className='text-sm font-medium text-slate-500'>Doctor</span>
          <span className='text-sm font-medium text-slate-500'>Fees</span>
          <span className='text-sm font-medium text-slate-500'>Status</span>
        </div>

        {/* Appointments List */}
        <div className='max-h-[70vh] overflow-y-auto scroll-smooth'>
          {appointments.map((item, index) => (
            <div 
              key={item._id}
              className='grid sm:grid-cols-[50px_1.5fr_0.8fr_1.5fr_1.5fr_1fr_120px] gap-4 items-center px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors group'
            >
              {/* Serial Number */}
              <span className='text-sm text-slate-500 max-sm:hidden'>{index + 1}</span>

              {/* Patient Info */}
              <div className='flex items-center gap-3 py-2'>
                <img 
                  src={item.userData?.image || assets.user_placeholder} 
                  className='w-10 h-10 rounded-full bg-slate-100 object-cover border-2 border-white shadow-sm'
                  alt="Patient"
                />
                <div>
                  <p className='text-sm font-medium text-slate-800'>{item.userData?.name || 'Unknown Patient'}</p>
                  <p className='text-xs text-slate-400 sm:hidden'>Patient</p>
                </div>
              </div>

              {/* Age */}
              <div className='max-sm:mt-2'>
                <p className='text-sm text-slate-600'>{calculateAge(item.docData?.dob || '')}</p>
                <p className='text-xs text-slate-400 sm:hidden'>Age</p>
              </div>

              {/* Schedule */}
              <div>
                <p className='text-sm text-slate-800'>
                  {slotDateFormat(item.slotDate)}, 
                  <span className='text-slate-500'> {item.slotTime}</span>
                </p>
                <p className='text-xs text-slate-400 sm:hidden'>Schedule</p>
              </div>

              {/* Doctor Info */}
              <div className='flex items-center gap-3 py-2'>
                <img 
                  src={item.docData?.image || assets.doctor_placeholder} 
                  className='w-10 h-10 rounded-full bg-slate-100 object-cover border-2 border-white shadow-sm'
                  alt="Doctor"
                />
                <div>
                  <p className='text-sm font-medium text-slate-800'>{item.docData?.name}</p>
                  <p className='text-xs text-slate-500'>{item.docData?.speciality}</p>
                </div>
              </div>

              {/* Fees */}
              <div>
                <p className='text-sm font-medium text-slate-800'>
                  {currency}{item.amount}
                </p>
                <p className='text-xs text-slate-400 sm:hidden'>Fees</p>
              </div>

              {/* Status/Actions */}
              <div className='flex justify-end'>
                {item.cancelled ? (
                  <span className='px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium'>
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors'
                  >
                    <img src={assets.cancel_icon} className='w-4' alt="Cancel" />
                    <span className='text-xs font-medium'>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments