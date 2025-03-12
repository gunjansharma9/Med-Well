import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='mx-5 my-8 w-full max-w-7xl'>
      <h2 className='mb-6 text-2xl font-semibold text-slate-800'>Patient Appointments</h2>

      <div className='bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[50px_1.5fr_1fr_1fr_1.5fr_1fr_160px] gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200'>
          <span className='text-sm font-medium text-slate-500'>#</span>
          <span className='text-sm font-medium text-slate-500'>Patient</span>
          <span className='text-sm font-medium text-slate-500'>Payment</span>
          <span className='text-sm font-medium text-slate-500'>Age</span>
          <span className='text-sm font-medium text-slate-500'>Schedule</span>
          <span className='text-sm font-medium text-slate-500'>Fees</span>
          <span className='text-sm font-medium text-slate-500'>Status</span>
        </div>

        {/* Appointments List */}
        <div className='max-h-[70vh] overflow-y-auto'>
          {appointments.reverse().map((item, index) => (
            <div 
              key={item._id}
              className='grid sm:grid-cols-[50px_1.5fr_1fr_1fr_1.5fr_1fr_160px] gap-4 items-center px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors'
            >
              {/* Serial Number */}
              <span className='text-sm text-slate-500 max-sm:hidden'>{index + 1}</span>

              {/* Patient Info */}
              <div className='flex items-center gap-3 py-2'>
                <img 
                  src={item.userData.image || assets.user_placeholder} 
                  className='w-10 h-10 rounded-full bg-slate-100 object-cover border-2 border-white shadow-sm'
                  alt="Patient"
                />
                <div>
                  <p className='text-sm font-medium text-slate-800'>{item.userData.name}</p>
                  <p className='text-xs text-slate-400 sm:hidden'>Patient</p>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  item.payment ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {item.payment ? 'Online' : 'Cash'}
                </span>
              </div>

              {/* Age */}
              <div className='max-sm:mt-2'>
                <p className='text-sm text-slate-600'>{calculateAge(item.userData.dob)}</p>
                <p className='text-xs text-slate-400 sm:hidden'>Age</p>
              </div>

              {/* Schedule */}
              <div>
                <p className='text-sm text-slate-800'>
                  {slotDateFormat(item.slotDate)}
                  <span className='text-slate-500'> • {item.slotTime}</span>
                </p>
                <p className='text-xs text-slate-400 sm:hidden'>Schedule</p>
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
                  <span className='px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium flex items-center gap-1'>
                    <img src={assets.cancel_icon} className='w-4' alt="" />
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium flex items-center gap-1'>
                    <img src={assets.tick_icon} className='w-4' alt="" />
                    Completed
                  </span>
                ) : (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className='p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-colors'
                    >
                      <img src={assets.tick_icon} className='w-5' alt="Complete" />
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors'
                    >
                      <img src={assets.cancel_icon} className='w-5' alt="Cancel" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment