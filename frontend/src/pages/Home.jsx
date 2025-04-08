import React from 'react';
import Header from '../components/Header';
import Speciality from '../components/Speciality';
import Banner from '../components/Banner';
import Benefits from '../components/Benefits';
import TopDoctors from '../components/TopDoctors';
import SymptomGuide from '../components/SymptomGuide';
import FAQSection from '../components/FAQs';

const Home = () => {
  return (
    <main className="flex flex-col gap-8">
      <Header />
      <Speciality />
      <TopDoctors />
      <Banner />
      <Benefits />
      <SymptomGuide />
      <FAQSection />
    </main>
  );
};

export default Home;
