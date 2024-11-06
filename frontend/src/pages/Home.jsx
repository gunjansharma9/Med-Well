import React from 'react'
import Header from '../components/Header'
import Speciality from './../components/Speciality';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';
import Benefits from '../components/Benefits';

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
