import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './../context/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const MyAppointment = () => {
  const {backendUrl,token,getDoctorsData} = useContext(AppContext)

  const [appointments,setAppointments] = useState([])

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+" " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async() => {
    try{
      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log('checking userdata')
        console.log(data.appointments)
      }
    }catch(error){
      console.error(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId) => {
    try{
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response) => {
        console.log(response)

        try{
          const {data} = await axios.post(backendUrl + '/api/user/verifyRazorpay',response,{headers:{token}})

          if(data.success){
            navigate('/my-appointments')
            getUserAppointments()
          }
        }catch(error){
          console.error(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async(appointmentId) => {
    try{
      const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay',{appointmentId},{headers:{token}})

      if(data.success){
        initPay(data.order)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token){
      getUserAppointments()
    }
  },[token])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
      <p className="text-gray-600 mb-8 border-b pb-4">
        {appointments.length} upcoming and past appointments
      </p>

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <img 
                  className="w-32 h-32 object-cover rounded-lg border-4 border-blue-50"
                  src={item.docData.image} 
                  alt={item.docData.name} 
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.docData.name}
                  <span className="ml-2 text-blue-600 text-sm font-medium">
                    {item.docData.speciality}
                  </span>
                </h2>
                
                <div className="space-y-1 text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm">{item.docData.address.line1}</p>
                      <p className="text-sm">{item.docData.address.line2}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">
                      {slotDateFormat(item.slotDate)} | {item.slotTime.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:w-48">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="w-full py-2 px-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    ✓ Payment Completed
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button 
                    onClick={() => appointmentRazorpay(item._id)}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Pay Now
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className="w-full py-2 px-4 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="w-full py-2 px-4 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium cursor-default">
                    Appointment Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="w-full py-2 px-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium cursor-default">
                    ✓ Consultation Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No appointments found</p>
          <button 
            onClick={() => navigate('/doctors')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Book an Appointment
          </button>
        </div>
      )}
    </div>
  )
}

export default MyAppointment