import React, { useContext, useState, useRef, useEffect } from 'react';
import { assets } from './../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setToken(false);
    localStorage.removeItem('token');
    setDropdownVisible(false);
  };

  // Close dropdown if click occurs outside
  useEffect(() => {
    const outsideClickListener = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('click', outsideClickListener);
    return () => document.removeEventListener('click', outsideClickListener);
  }, []);

  return (
    <div className='flex justify-between items-center text-sm py-4 mb-5 border-b border-gray-300 shadow-sm px-6 md:px-12 bg-white'>
      <img
        src={assets.major_logo}
        alt='Logo'
        className='w-44 cursor-pointer transition-transform duration-200 hover:scale-105'
        onClick={() => navigate('/')}
      />

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-center gap-6 font-medium'>
        {['/', '/doctors', '/guide', '/reports', '/about', '/contact'].map((route, idx) => (
          <NavLink
            key={idx}
            to={route}
            className={({ isActive }) =>
              `relative py-1 text-base transition-colors duration-300 hover:text-primary ${
                isActive
                  ? 'text-primary after:content-[" "] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary after:transition-transform after:duration-300 after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
              }`
            }
          >
            <li className='px-3 py-1'>{route.replace('/', '').toUpperCase() || 'HOME'}</li>
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-6'>
        {token && userData ? (
          <div className='relative flex items-center gap-2 cursor-pointer' ref={dropdownRef}>
            <img
              src={userData.image}
              alt='User'
              className='w-10 h-10 rounded-full border-2 border-gray-300'
              onClick={() => setDropdownVisible((prev) => !prev)}
            />
            <img
              src={assets.dropdown_icon}
              alt='Toggle Dropdown'
              className={`w-3 transition-transform duration-200 ${dropdownVisible ? 'rotate-180' : ''}`}
            />

            {dropdownVisible && (
              <div className='absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg p-4 z-20'>
                <p
                  className='cursor-pointer py-2 hover:text-black transition-all duration-200'
                  onClick={() => navigate('/my-profile')}
                >
                  My Profile
                </p>
                <p
                  className='cursor-pointer py-2 hover:text-black transition-all duration-200'
                  onClick={() => navigate('/my-appointments')}
                >
                  My Appointments
                </p>
                <p
                  className='cursor-pointer py-2 hover:text-red-600 transition-all duration-200'
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-6 py-3 rounded-full font-bold hidden md:block transition-all duration-300 hover:bg-opacity-80'
          >
            Create account
          </button>
        )}

        <img
          src={assets.menu_icon}
          alt='Menu Icon'
          className='w-6 md:hidden cursor-pointer'
          onClick={() => setMenuVisible(true)}
        />

        {/* Mobile Navigation Drawer */}
        <div
          className={`${
            menuVisible ? 'fixed w-full h-screen bg-white shadow-xl z-20' : 'hidden'
          } md:hidden top-0 right-0 bottom-0 transition-all`}
        >
          <div className='flex justify-between items-center px-6 py-6 border-b border-gray-300'>
            <img src={assets.major_logo} alt='Logo' className='w-36' />
            <img
              src={assets.cross_icon}
              alt='Close'
              className='w-7 cursor-pointer'
              onClick={() => setMenuVisible(false)}
            />
          </div>
          <ul className='flex flex-col items-center gap-5 mt-6 text-lg font-medium'>
            {['/', '/doctors', '/about', '/contact'].map((route, idx) => (
              <NavLink
                key={idx}
                to={route}
                onClick={() => setMenuVisible(false)}
                className='block py-3 px-6 w-full text-center rounded-md transition-all duration-200 hover:bg-gray-100'
              >
                {route.replace('/', '').toUpperCase() || 'HOME'}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
