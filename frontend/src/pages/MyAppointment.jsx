import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format the date from slotDate string (e.g. 01_04_2025 => 01 Apr 2025)
  const formatSlotDate = (dateString) => {
    const [day, month, year] = dateString.split('_');
    return `${day} ${monthNames[parseInt(month)]} ${year}`;
  };

  // Fetch all appointments for the current user
  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });

      if (data.success) {
        setAppointments([...data.appointments].reverse());
        console.log("Appointments fetched:", data.appointments);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Cancel a specific appointment
  const handleCancel = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, 
        { appointmentId }, 
        { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        fetchAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Initialize Razorpay payment
  const launchPayment = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Secure online payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, {
            headers: { token }
          });

          if (data.success) {
            fetchAppointments();
            navigate('/my-appointments');
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Create payment for appointment
  const initiatePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, 
        { appointmentId }, 
        { headers: { token } });

      if (data.success) {
        launchPayment(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
      <p className="text-gray-600 mb-8 border-b pb-4">
        {appointments.length} total appointments
      </p>

      <div className="space-y-6">
        {appointments.map((appt, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 transition-shadow"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img 
                  src={appt.docData.image} 
                  alt={appt.docData.name} 
                  className="w-32 h-32 object-cover rounded-lg border-4 border-blue-50"
                />
              </div>

              {/* Appointment Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {appt.docData.name}
                  <span className="ml-2 text-blue-600 text-sm font-medium">
                    {appt.docData.speciality}
                  </span>
                </h2>

                <div className="space-y-1 text-gray-600">
                  <div className="flex gap-2 items-start">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm">{appt.docData.address.line1}</p>
                      <p className="text-sm">{appt.docData.address.line2}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">
                      {formatSlotDate(appt.slotDate)} | {appt.slotTime.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Actions */}
              <div className="flex flex-col gap-3 sm:w-48">
                {!appt.cancelled && appt.payment && !appt.isCompleted && (
                  <button className="w-full py-2 px-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    ✓ Payment Completed
                  </button>
                )}

                {!appt.cancelled && !appt.payment && !appt.isCompleted && (
                  <button 
                    onClick={() => initiatePayment(appt._id)}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                  >
                    Pay Now
                  </button>
                )}

                {!appt.cancelled && !appt.isCompleted && (
                  <button 
                    onClick={() => handleCancel(appt._id)}
                    className="w-full py-2 px-4 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium"
                  >
                    Cancel Appointment
                  </button>
                )}

                {appt.cancelled && !appt.isCompleted && (
                  <button className="w-full py-2 px-4 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium cursor-default">
                    Appointment Cancelled
                  </button>
                )}

                {appt.isCompleted && (
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
          <p className="text-gray-500 mb-4">No appointments to show</p>
          <button 
            onClick={() => navigate('/doctors')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Book an Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
