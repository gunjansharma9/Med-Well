import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from './../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General Physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [dob, setDob] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (!docImg) {
                return toast.error('Image Not Selected');
            }
            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
            formData.append('dob', dob);

            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                setDocImg(null);
                setName('');
                setPassword('');
                setEmail('');
                setAddress1('');
                setAddress2('');
                setDegree('');
                setAbout('');
                setFees('');
                setDob('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='mx-5 my-8 w-full max-w-6xl'>
            <h2 className='mb-6 text-2xl font-semibold text-slate-800'>Add New Doctor</h2>

            <div className='bg-white rounded-xl shadow-sm border border-slate-100 p-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Left Column */}
                    <div className='space-y-6'>
                        {/* Image Upload */}
                        <div className='flex items-center gap-6 mb-8'>
                            <label htmlFor="doc-img" className='group relative cursor-pointer'>
                                <div className='w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-emerald-500'>
                                    {docImg ? (
                                        <img 
                                            src={URL.createObjectURL(docImg)} 
                                            alt="Doctor preview" 
                                            className='w-full h-full object-cover'
                                        />
                                    ) : (
                                        <img 
                                            src={assets.upload_area} 
                                            alt="Upload" 
                                            className='w-8 h-8 opacity-50 group-hover:opacity-70 transition-opacity'
                                        />
                                    )}
                                </div>
                                <input 
                                    type="file" 
                                    id="doc-img" 
                                    onChange={(e) => setDocImg(e.target.files[0])} 
                                    className='hidden' 
                                    accept='image/*'
                                />
                            </label>
                            <div>
                                <p className='text-sm font-medium text-slate-600 mb-1'>Doctor Photo</p>
                                <p className='text-sm text-slate-400'>Recommended size: 200x200px</p>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-600 mb-1'>Full Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors'
                                    type="text"
                                    placeholder='Dr. John Doe'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-slate-600 mb-1'>Email Address</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors'
                                    type="email"
                                    placeholder='john.doe@clinic.com'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-slate-600 mb-1'>Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors'
                                    type="password"
                                    placeholder='••••••••'
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='space-y-6'>
                        {/* Professional Details */}
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-600 mb-1'>Specialization</label>
                                <select
                                    value={speciality}
                                    onChange={(e) => setSpeciality(e.target.value)}
                                    className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white appearance-none'
                                >
                                    <option value="General Physician">General Physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Urology">Urology</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-slate-600 mb-1'>Experience</label>
                                    <select
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white'
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i} value={`${i+1} Year`}>{i+1} Year{i !== 0 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-slate-600 mb-1'>Consultation Fee</label>
                                    <div className='relative'>
                                        <span className='absolute left-3 top-3.5 text-slate-400'>₹</span>
                                        <input
                                            value={fees}
                                            onChange={(e) => setFees(e.target.value)}
                                            className='w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                                            type="number"
                                            placeholder='500'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-slate-600 mb-1'>Education</label>
                                <input
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                    className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                                    type="text"
                                    placeholder='MBBS, MD Medicine'
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-slate-600 mb-1'>Address</label>
                                <input
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 mb-2'
                                    type="text"
                                    placeholder='Street Address'
                                    required
                                />
                                <input
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                                    type="text"
                                    placeholder='City, State, ZIP'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-slate-600 mb-1'>Date of Birth</label>
                                <input
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    type="date"
                                    className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className='mt-8'>
                    <label className='block text-sm font-medium text-slate-600 mb-2'>About Doctor</label>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className='w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none min-h-[120px]'
                        placeholder="Describe the doctor's qualifications, expertise, and achievements..."
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300'
                >
                    Add Doctor
                </button>
            </div>
        </form>
    );
};

export default AddDoctor;