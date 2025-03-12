import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      };

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="mx-5 my-8 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image Section - Unchanged functionality */}
        <div className="flex-shrink-0">
          <img 
            className="w-48 h-48 rounded-xl object-cover border-4 border-white shadow-lg"
            src={profileData.image} 
            alt="Doctor Profile" 
          />
        </div>

        {/* Profile Details Section */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">{profileData.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-slate-600 text-sm">
                  {profileData.degree} - {profileData.speciality}
                </p>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                  {profileData.experience} Experience
                </span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-500 mb-2">About</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {profileData.about}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Fees Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-500 mb-1">
                Appointment Fee
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">{currency}</span>
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      fees: e.target.value
                    }))}
                    className="w-32 px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-slate-800 font-medium">{profileData.fees}</p>
                )}
              </div>
            </div>

            {/* Availability Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-500 mb-1">
                Availability
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={profileData.available}
                  onChange={() => isEdit && setProfileData(prev => ({
                    ...prev,
                    available: !prev.available
                  }))}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`text-sm ${profileData.available ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {profileData.available ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>

            {/* Address Section */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-slate-500 mb-1">
                Clinic Address
              </label>
              <div className="space-y-1">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={profileData.address.line1}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value
                        }
                      }))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500"
                      placeholder="Street Address"
                    />
                    <input
                      type="text"
                      value={profileData.address.line2}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value
                        }
                      }))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500"
                      placeholder="City, State, ZIP"
                    />
                  </>
                ) : (
                  <div className="text-slate-600 text-sm">
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;