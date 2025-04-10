import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import SymptomGuide from './components/SymptomGuide'
import Report from './pages/Reports'

const App = () => {
  return (
    // <div className='mx-4 sm:mx-[10%]'>
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointment/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
        <Route path='/guide' element={<SymptomGuide/>} />
        <Route path='/reports' element={<Report/>}  />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
