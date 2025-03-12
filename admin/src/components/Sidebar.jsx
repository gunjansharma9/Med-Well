import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    const navLinkStyle = ({ isActive }) => 
        `flex items-center gap-4 p-3 md:px-6 md:py-3.5 transition-all duration-200
         hover:bg-slate-50 hover:pl-5
         ${isActive ? 'bg-slate-100 border-l-4 border-emerald-600 pl-5 font-medium text-slate-800' 
                    : 'text-slate-600 border-l-4 border-transparent'}`

    return (
        <div className='min-h-screen bg-white border-r border-slate-100 w-full md:w-64'>
            <div className='sticky top-0 pt-6'>
                {aToken && (
                    <ul className='space-y-0.5'>
                        <NavLink className={navLinkStyle} to='/admin-dashboard'>
                            <img src={assets.home_icon} className='w-5 h-5 md:w-5.5 md:h-5.5' alt="Dashboard" />
                            <span className='hidden md:block text-sm font-normal'>Dashboard</span>
                        </NavLink>

                        <NavLink className={navLinkStyle} to='/all-appointments'>
                            <img src={assets.appointment_icon} className='w-5 h-5 md:w-5.5 md:h-5.5' alt="Appointments" />
                            <span className='hidden md:block text-sm font-normal'>Appointments</span>
                        </NavLink>

                        <NavLink className={navLinkStyle} to='/add-doctor'>
                            <img src={assets.add_icon} className='w-5 h-5 md:w-5.5 md:h-5.5' alt="Add Doctor" />
                            <span className='hidden md:block text-sm font-normal'>Add Doctor</span>
                        </NavLink>

                        <NavLink className={navLinkStyle} to='/doctor-list'>
                            <img src={assets.people_icon} className='w-5 h-5 md:w-5.5 md:h-5.5' alt="Doctors List" />
                            <span className='hidden md:block text-sm font-normal'>Doctors List</span>
                        </NavLink>
                    </ul>
                )}

                {dToken && (
                    <ul className='space-y-0.5'>
                        <NavLink className={navLinkStyle} to='/doctor-dashboard'>
                            <img src={assets.home_icon} className='w-5 h-5 md:w-5.5 md:h-5.5' alt="Dashboard" />
                            <span className='hidden md:block text-sm font-normal'>Dashboard</span>
                        </NavLink>

                        <NavLink className={navLinkStyle} to='/doctor-appointments'>
                            <img src={assets.appointment_icon} className='w-5 h-5 md:w-5.5 md:h-5.5' alt="Appointments" />
                            <span className='hidden md:block text-sm font-normal'>Appointments</span>
                        </NavLink>

                        <NavLink className={navLinkStyle} to='/doctor-profile'>
                            <img src={assets.people_icon} className='w-5 h-5 md:w-5.5 md:h-5.5' alt="Profile" />
                            <span className='hidden md:block text-sm font-normal'>Profile</span>
                        </NavLink>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Sidebar