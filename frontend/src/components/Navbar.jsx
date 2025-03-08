// import React, { useContext, useState } from 'react'
// import { assets } from './../assets/assets';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';


// const Navbar = () => {
//   const navigate = useNavigate();
//   const {token,setToken,userData} = useContext(AppContext)
//   const [showMenu,setShowMenu] = useState(false)
//   const logout = () => {
//     setToken(false)
//     localStorage.removeItem('token')
//   }

//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
//       <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.major_logo} alt="" />
//       <ul className='hidden md:flex items-start gap-5 font-medium'>
//         <NavLink to='/'>
//           <li className='py-1 text-base'>HOME</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//         </NavLink>
//         <NavLink to='/doctors'>
//           <li className='py-1 text-base'>ALL DOCTORS</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//         </NavLink>
//         <NavLink to='/report'>
//           <li className='py-1 text-base'>REPORTS</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//         </NavLink>
//         <NavLink to='/about'>
//           <li className='py-1 text-base'>ABOUT</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//         </NavLink>
//         <NavLink to='/contact'>
//           <li className='py-1 text-base'>CONTACT</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
//         </NavLink>
//       </ul>
//       <div className='flex items-center gap-4'>
//         {
//           token && userData ? 
//           <div className='flex items-center gap-2 cursor-pointer group relative'>
//             <img className='w-9 h-9 rounded-full' src={userData.image} alt=""/>
//             <img className='w-2.5' src={assets.dropdown_icon} alt="" />
//             <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//               <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
//                 <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                 <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                 <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
//               </div>
//             </div>
//           </div> : 
//           <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-bold hidden md:block'>Create account</button> 
//         }
//         <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
//         {/* For Mobile */}
//         <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
//           <div className='flex items-center justify-between px-5 py-6'>
//             <img className='w-36' src={assets.major_logo} alt="" />
//             <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
//           </div>
//           <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//             <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar


import React, { useContext, useState } from 'react';
import { assets } from './../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 shadow-sm px-6 md:px-12 bg-white'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer transition-transform duration-200 hover:scale-105' src={assets.major_logo} alt='' />
      <ul className='hidden md:flex items-center gap-6 font-medium'>
        {['/', '/doctors', '/about', '/contact'].map((path, index) => (
          <NavLink 
            key={index} 
            to={path} 
            className={({ isActive }) => `relative py-1 text-base transition-colors duration-300 hover:text-primary ${isActive ? 'text-primary after:content-[" "] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary after:transition-transform after:duration-300 after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'}`}
          >
            <li className='px-3 py-1'>{path.replace('/', '').toUpperCase() || 'HOME'}</li>
          </NavLink>
        ))}
      </ul>
      <div className='flex items-center gap-6'>
        {token && userData ? (
          <div className='relative flex items-center gap-2 cursor-pointer group'>
            <img className='w-10 h-10 rounded-full border-2 border-gray-300' src={userData.image} alt='' />
            <img className='w-3 transition-transform duration-200 group-hover:rotate-180' src={assets.dropdown_icon} alt='' />
            <div className='absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg p-4 hidden group-hover:block z-20'>
              <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer py-2 transition-all duration-200'>My Profile</p>
              <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer py-2 transition-all duration-200'>My Appointments</p>
              <p onClick={logout} className='hover:text-red-600 cursor-pointer py-2 transition-all duration-200'>Logout</p>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-6 py-3 rounded-full font-bold hidden md:block transition-all duration-300 hover:bg-opacity-80'>Create account</button>
        )}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt='' />
        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed w-full h-screen bg-white shadow-xl z-20' : 'hidden'} md:hidden right-0 top-0 bottom-0 transition-all`}>
          <div className='flex items-center justify-between px-6 py-6 border-b border-gray-300'>
            <img className='w-36' src={assets.major_logo} alt='' />
            <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt='' />
          </div>
          <ul className='flex flex-col items-center gap-5 mt-6 text-lg font-medium'>
            {['/', '/doctors', '/about', '/contact'].map((path, index) => (
              <NavLink key={index} onClick={() => setShowMenu(false)} to={path} className='block py-3 px-6 rounded-md w-full text-center transition-all duration-200 hover:bg-gray-100'>
                {path.replace('/', '').toUpperCase() || 'HOME'}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


