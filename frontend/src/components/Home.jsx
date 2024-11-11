import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestBusiness from './LatestBusiness'
import Footer from './shared/Footer'
import useGetAllBusinessinfos from '@/hooks/useGetAllBusinessinfos'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllBusinessinfos();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'Entrepreneur or Founder') {
      navigate("/admin/businesses");
    }
  }, []);
  return (
    <div className="bg-gray-900 shadow">
        <Navbar/>
        <HeroSection/>
        <LatestBusiness />
        <Footer/>
    </div>
  )
}

export default Home