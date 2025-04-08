import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-gradient-to-b from-blue-50 to-indigo-50 mt-40 py-16 px-6 md:px-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24'>
          {/* Brand Section */}
          <div className='space-y-6'>
            <img 
              className='w-44 hover:scale-105 transition-transform duration-300' 
              src={assets.major_logo} 
              alt="MedWell Logo" 
            />
            <p className='text-gray-600 leading-relaxed text-base'>
              Your trusted partner in accessible healthcare. Book appointments instantly with certified medical professionals, available 24/7 for your convenience.
            </p>
            <div className='flex gap-4 mt-4'>
              <SocialIcon icon="facebook" />
              <SocialIcon icon="linkedin" />
              <SocialIcon icon="instagram" />
              <SocialIcon icon="youtube" />
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold text-blue-900 mb-4'>Quick Links</h3>
            <ul className='space-y-3'>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/doctors">Find Doctors</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>

          {/* Contact Section */}
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold text-blue-900 mb-4'>Contact Us</h3>
            <div className='space-y-4'>
              <ContactItem 
                icon="phone" 
                text="+91 97100 00000" 
              />
              <ContactItem 
                icon="email" 
                text="care@medwell.com" 
              />
              <ContactItem 
                icon="location" 
                text="Health Plaza, 15th Floor, Mumbai, India" 
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-blue-100 my-12'></div>

        {/* Copyright */}
        <div className='text-center text-gray-500 text-sm'>
          © 2025 MedWell. All rights reserved. | Compassionate care, digital convenience
        </div>
      </div>
    </div>
  )
}

// Social Icon Component
const SocialIcon = ({ icon }) => {
  const icons = {
    facebook: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
    linkedin: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    youtube: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'
  }

  return (
    <a href="#" className='p-2 rounded-full bg-white shadow-lg hover:shadow-blue-200 hover:-translate-y-1 transition-all'>
      <svg className='w-6 h-6 text-blue-600' viewBox='0 0 24 24'>
        <path fill='currentColor' d={icons[icon]} />
      </svg>
    </a>
  )
}

// Footer Link Component
const FooterLink = ({ href, children }) => (
  <li>
    <a 
      href={href} 
      className='text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center group'
    >
      <span className='mr-2 opacity-0 group-hover:opacity-100 transition-opacity'>→</span>
      {children}
    </a>
  </li>
)

// Contact Item Component
const ContactItem = ({ icon, text }) => {
  const icons = {
    phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    location: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z'
  }

  return (
    <div className='flex items-start gap-3'>
      <span className='mt-1 p-2 bg-blue-100 rounded-lg text-blue-600'>
        <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' d={icons[icon]} clipRule='evenodd' />
        </svg>
      </span>
      <p className='text-gray-600 flex-1'>{text}</p>
    </div>
  )
}

export default Footer