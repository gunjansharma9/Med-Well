import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DoctorCard from '../components/DoctorCard';
import { FiFilter } from 'react-icons/fi';
import { GiMedicinePills, GiStethoscope, GiKidneys } from 'react-icons/gi';
import { MdWoman, MdChildFriendly } from 'react-icons/md';
import { FaClinicMedical } from 'react-icons/fa';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const specialtiesList = [
    { name: 'General Physician', icon: <GiStethoscope /> },
    { name: 'Gynecologist', icon: <MdWoman /> },
    { name: 'Dermatologist', icon: <GiMedicinePills /> },
    { name: 'Pediatricians', icon: <MdChildFriendly /> },
    { name: 'Urology', icon: <GiKidneys /> },
    { name: 'Gastroenterologist', icon: <FaClinicMedical /> }
  ];

  useEffect(() => {
    if (speciality) {
      const result = doctors.filter(doc => doc.speciality === speciality);
      setFilteredDoctors(result);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [speciality, doctors]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {speciality ? `${speciality}s` : 'All Specialists'}
        </h1>
        <button
          onClick={() => setShowSidebar(prev => !prev)}
          className="sm:hidden p-3 bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors"
        >
          <FiFilter className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        {/* Sidebar Filter Panel */}
        <div className={`${showSidebar ? 'absolute inset-0 bg-black/20 z-50 sm:bg-transparent' : 'hidden'} sm:block sm:relative sm:w-64`}>
          <div className="bg-white sm:bg-transparent p-6 sm:p-0 rounded-xl sm:rounded-none shadow-xl sm:shadow-none">
            <div className="flex justify-between items-center mb-4 sm:hidden">
              <h2 className="text-xl font-semibold">Specialties</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {specialtiesList.map((spec) => (
                <button
                  key={spec.name}
                  onClick={() =>
                    navigate(speciality === spec.name ? '/doctors' : `/doctors/${spec.name}`)
                  }
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    speciality === spec.name
                      ? 'bg-blue-100 text-blue-600 font-semibold border-2 border-blue-200'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-xl text-blue-500">{spec.icon}</span>
                  <span>{spec.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Display Grid */}
        <div className="flex-1">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl mb-4">No doctors found in this specialty</p>
              <button
                onClick={() => navigate('/doctors')}
                className="text-blue-600 hover:underline"
              >
                View all doctors
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc, idx) => (
                <DoctorCard 
                  key={idx} 
                  item={doc} 
                  className="hover:shadow-lg transition-shadow duration-300" 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
