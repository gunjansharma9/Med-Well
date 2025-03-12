import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  if (!dashData) return null

  return (
    <div className='mx-5 my-8'>
      {/* Metrics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-8'>
        {/* Doctors Card */}
        <div className='bg-white rounded-xl p-6 shadow-sm border-l-4 border-emerald-500 hover:shadow-md transition-all'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-emerald-50 rounded-lg'>
              <img className='w-8 h-8' src={assets.doctor_icon} alt="Doctors" />
            </div>
            <div>
              <p className='text-2xl font-semibold text-slate-800'>{dashData.doctors}</p>
              <p className='text-sm text-slate-500'>Active Doctors</p>
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
        <div className='bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-all'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-purple-50 rounded-lg'>
              <img className='w-8 h-8' src={assets.patients_icon} alt="Patients" />
            </div>
            <div>
              <p className='text-2xl font-semibold text-slate-800'>{dashData.patients}</p>
              <p className='text-sm text-slate-500'>Registered Patients</p>
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
              {/* Doctor Info */}
              <div className='flex items-center gap-4 flex-1'>
                <img 
                  src={item.docData.image} 
                  className='w-12 h-12 rounded-full bg-slate-100 object-cover border-2 border-white shadow-sm'
                  alt="Doctor"
                />
                <div>
                  <p className='font-medium text-slate-800'>{item.docData.name}</p>
                  <p className='text-sm text-slate-500'>{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              {/* Status/Action */}
              <div className='flex items-center gap-4'>
                {item.cancelled ? (
                  <span className='px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium'>
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors'
                  >
                    <img src={assets.cancel_icon} className='w-5' alt="Cancel" />
                    <span className='text-sm font-medium'>Cancel</span>
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

export default Dashboard