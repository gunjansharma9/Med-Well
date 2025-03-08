import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const isSlotAvailable = !(docInfo.slots_booked?.[slotDate]?.includes(formattedTime));

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0]?.datetime;
      if (!date) {
        toast.error('Invalid time slot selection');
        return;
      }

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) return <div className="text-center p-8">Loading doctor details...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Doctor Profile Section */}
      <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-lg p-6 mb-8">
        {/* Doctor Image - Fixed aspect ratio */}
        <div className="lg:w-1/3 relative group flex justify-center">
          <div className="w-full aspect-square overflow-hidden rounded-xl shadow-md border-4 border-white">
            <img
              className="w-full h-full object-contain transform transition duration-300 hover:scale-105"
              src={docInfo.image || assets.profile_pic}
              alt={docInfo.name}
            />
          </div>
          <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
            <img src={assets.info_icon} className="w-4 h-4" alt="speciality" />
            <span className="text-sm font-medium text-gray-700">{docInfo.speciality}</span>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="lg:w-2/3 space-y-4">
          <div className="flex items-start gap-3">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              {docInfo.name}
              <img src={assets.verified_icon} className="w-6 h-6" alt="verified" />
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-100">
              {docInfo.degree}
            </span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm border border-emerald-100">
              {docInfo.experience} years experience
            </span>
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-500">
              Appointment fee: 
              <span className="ml-2 text-2xl text-gray-800">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <img src={assets.info_icon} className="w-5 h-5" alt="about" />
              About Doctor
            </h3>
            <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Time Slots</h2>
        
        {/* Date Selection */}
        <div className="mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`flex flex-col items-center p-4 min-w-[120px] rounded-xl cursor-pointer transition-all ${
                  slotIndex === index 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white hover:bg-blue-100 border border-gray-200'
                }`}
              >
                <span className="text-sm font-medium">
                  {item[0]?.datetime && daysOfWeek[item[0].datetime.getDay()]}
                </span>
                <span className="text-2xl font-bold mt-1">
                  {item[0]?.datetime?.getDate()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {docSlots[slotIndex]?.map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                item.time === slotTime
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white hover:bg-blue-100 border border-gray-200 text-gray-700'
              }`}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={bookAppointment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full 
                     font-semibold shadow-md transition-colors transform hover:scale-105"
          >
            Confirm Appointment
          </button>
        </div>
      </div>

      {/* Related Doctors Section */}
      <div className="w-full px-4 sm:px-0">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );
};

export default Appointment;