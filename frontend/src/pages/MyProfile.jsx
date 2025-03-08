import React, { useContext, useState } from 'react';
import { assets } from './../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEdit, FiSave, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiUpload } from 'react-icons/fi';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return userData && (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FiUser className="text-blue-500" />
          My Profile
        </h1>
        {!isEdit && (
          <button 
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <FiEdit /> Edit Profile
          </button>
        )}
      </div>

      {/* Profile Picture Section */}
      <div className="mb-8 flex justify-center">
        <label htmlFor="image" className="cursor-pointer relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 relative">
            <img 
              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
              src={image ? URL.createObjectURL(image) : userData.image || assets.profile_pic}
              alt="Profile"
            />
            {isEdit && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiUpload className="text-white text-2xl" />
              </div>
            )}
          </div>
          {isEdit && <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" className="hidden" />}
        </label>
      </div>

      {/* Profile Details */}
      <div className="space-y-6">
        {/* Name Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <FiUser /> Full Name
          </label>
          {isEdit ? (
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <p className="text-lg text-gray-800">{userData.name}</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <FiMapPin /> Contact Information
          </h2>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <FiMail /> Email Address
              </label>
              <p className="text-gray-600">{userData.email}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <FiPhone /> Phone Number
              </label>
              {isEdit ? (
                <input
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={userData.phone}
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600">{userData.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <FiMapPin /> Address
              </label>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={userData.address.line1}
                    onChange={e => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                  />
                  <input
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={userData.address.line2}
                    onChange={e => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                  />
                </div>
              ) : (
                <p className="text-gray-600">
                  {userData.address.line1}<br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <FiUser /> Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="text-sm font-medium text-gray-500">Gender</label>
              {isEdit ? (
                <select
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={userData.gender}
                  onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-600">{userData.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <FiCalendar /> Date of Birth
              </label>
              {isEdit ? (
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={userData.dob}
                  onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600">{new Date(userData.dob).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEdit && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={updateUserProfileData}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <FiSave /> Save Changes
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;