import React from 'react'
import Header from '../components/Header'
import Speciality from './../components/Speciality';
import Banner from '../components/Banner';
import Benefits from '../components/Benefits';
import TopDoctors from '../components/TopDoctors';

const Home = () => {
  return (
    <div>
      <Header/>
      <Speciality/>
      <TopDoctors/>
      <Banner/>
      <Benefits/>
    </div>
  )
}

export default Home
