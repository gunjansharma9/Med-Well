import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  if (!dashData) return null

  return (
    <div className='mx-5 my-8'>
      {/* Metrics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-8'>
        {/* Earnings Card */}
        <div className='bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-all'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-purple-50 rounded-lg'>
              <img className='w-8 h-8' src={assets.earning_icon} alt="Earnings" />
            </div>
            <div>
              <p className='text-2xl font-semibold text-slate-800'>{currency}{dashData.earnings}</p>
              <p className='text-sm text-slate-500'>Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-50 rounded-lg'>
              <img className='w-8 h-8' src={assets.appointments_icon} alt="Appointments" />
            </div>
            <div>
              <p className='text-2xl font-semibold text-slate-800'>{dashData.appointments}</p>
              <p className='text-sm text-slate-500'>Total Appointments</p>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className='bg-white rounded-xl p-6 shadow-sm border-l-4 border-emerald-500 hover:shadow-md transition-all'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-emerald-50 rounded-lg'>
              <img className='w-8 h-8' src={assets.patients_icon} alt="Patients" />
            </div>
            <div>
              <p className='text-2xl font-semibold text-slate-800'>{dashData.patients}</p>
              <p className='text-sm text-slate-500'>Unique Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments Section */}
      <div className='bg-white rounded-xl shadow-sm border border-slate-100'>
        <div className='px-6 py-4 border-b border-slate-100'>
          <h3 className='flex items-center gap-3 text-lg font-semibold text-slate-800'>
            <img src={assets.list_icon} className='w-6 h-6' alt="List" />
            Recent Appointments
          </h3>
        </div>

        <div className='divide-y divide-slate-100'>
          {dashData.latestAppointments.map((item, index) => (
            <div 
              key={index}
              className='flex items-center px-6 py-4 hover:bg-slate-50 transition-colors'
            >
              {/* Patient Info */}
              <div className='flex items-center gap-4 flex-1'>
                <img 
                  src={item.userData.image} 
                  className='w-12 h-12 rounded-full bg-slate-100 object-cover border-2 border-white shadow-sm'
                  alt="Patient"
                />
                <div>
                  <p className='font-medium text-slate-800'>{item.userData.name}</p>
                  <p className='text-sm text-slate-500'>{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              {/* Status/Actions */}
              <div className='flex items-center gap-4'>
                {item.cancelled ? (
                  <span className='px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium flex items-center gap-1'>
                    <img src={assets.cancel_icon} className='w-4' alt="Cancelled" />
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium flex items-center gap-1'>
                    <img src={assets.tick_icon} className='w-4' alt="Completed" />
                    Completed
                  </span>
                ) : (
                  <div className='flex gap-2'>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className='px-4 py-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-600 transition-colors flex items-center gap-2'
                    >
                      <img src={assets.tick_icon} className='w-5' alt="Complete" />
                      <span className='text-sm font-medium'>Complete</span>
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors flex items-center gap-2'
                    >
                      <img src={assets.cancel_icon} className='w-5' alt="Cancel" />
                      <span className='text-sm font-medium'>Cancel</span>
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

export default DoctorDashboard
