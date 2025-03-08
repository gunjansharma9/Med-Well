import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiStethoscope } from 'react-icons/gi';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DoctorCard = ({ item }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/appointment/${item._id}`);
        window.scrollTo(0, 0);
    };

    return (
        <div 
            onClick={handleNavigation}
            className="group relative border border-gray-100 rounded-2xl overflow-hidden cursor-pointer 
            hover:shadow-lg transition-all duration-300 bg-white transform hover:-translate-y-1"
        >
            {/* Doctor Image Section */}
            <div className="relative h-48 bg-gray-50 flex items-end justify-center">
                <div className="absolute top-4 right-4 flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-white shadow-sm">
                    <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <span className={`${item.available ? 'text-green-700' : 'text-gray-600'}`}>
                        {item.available ? 'Available' : 'Busy'}
                    </span>
                </div>
                
                <img 
                    className="w-48 h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.name}
                />
            </div>

            {/* Doctor Details */}
            <div className="p-6 space-y-4">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                        <GiStethoscope className="text-lg" />
                        <span className="font-medium">{item.speciality}</span>
                    </div>
                </div>

                {/* Professional Animated Button */}
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                    rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-md 
                    transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleNavigation}
                >
                    <span>Book Appointment</span>
                    <FaRegCalendarCheck className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
            </div>
        </div>
    );
};

export default DoctorCard;