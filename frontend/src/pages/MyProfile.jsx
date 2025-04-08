import React, { useContext, useState } from 'react';
import { assets } from './../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FiEdit,
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUpload,
} from 'react-icons/fi';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (selectedImage) formData.append('image', selectedImage);

      const response = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await loadUserProfileData();
        setIsEditing(false);
        setSelectedImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return userData && (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <FiUser className="text-blue-500" />
          Profile Overview
        </h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            <FiEdit />
            Edit
          </button>
        )}
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-8">
        <label htmlFor="profileImage" className="relative group cursor-pointer">
          <div className="w-32 h-32 rounded-full border-4 border-blue-100 overflow-hidden relative">
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : userData.image || assets.profile_pic}
              alt="User"
              className="object-cover w-full h-full group-hover:opacity-75 transition-opacity"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiUpload className="text-white text-2xl" />
              </div>
            )}
          </div>
          {isEditing && (
            <input
              type="file"
              id="profileImage"
              className="hidden"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          )}
        </label>
      </div>

      {/* Info Sections */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <FiUser />
            Name
          </label>
          {isEditing ? (
            <input
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-800 text-lg">{userData.name}</p>
          )}
        </div>

        {/* Contact */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <FiMapPin /> Contact Info
          </h2>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FiMail /> Email
            </label>
            <p className="text-gray-700">{userData.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FiPhone /> Phone
            </label>
            {isEditing ? (
              <input
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <FiMapPin /> Address
            </label>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={userData.address.line1}
                  onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  value={userData.address.line2}
                  onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        {/* Basic Details */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <FiUser /> Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="text-sm font-medium text-gray-600">Gender</label>
              {isEditing ? (
                <select
                  value={userData.gender}
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender}</p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <FiCalendar /> Birth Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{new Date(userData.dob).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleProfileUpdate}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              <FiSave /> Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-100"
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
