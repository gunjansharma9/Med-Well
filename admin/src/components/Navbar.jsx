import React from 'react'
import { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const navigate = useNavigate()
    const { dToken, setDToken } = useContext(DoctorContext)

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className='flex justify-between items-center px-6 sm:px-8 py-4 bg-white border-b border-slate-100 shadow-sm'>
            <div className='flex items-center gap-4'>
                <img 
                    className='w-32 sm:w-40 transition-opacity duration-300 hover:opacity-80 cursor-pointer' 
                    src={assets.major_logo} 
                    alt="Healthcare Logo"
                />
                <span className='font-inter font-medium text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-md'>
                    {aToken ? 'Administrator' : 'Medical Practitioner'}
                </span>
            </div>
            
            <button 
                onClick={logout}
                className='font-inter group flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors duration-300'
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" 
                    clipRule="evenodd" />
                </svg>
                <span className='border-b border-transparent group-hover:border-slate-400 transition-all duration-300'>
                    Sign Out
                </span>
            </button>
        </div>
    )
}

export default Navbar