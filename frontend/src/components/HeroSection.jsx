import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/businessinfoSlice';
import investhome from '../assets/invest_home.gif';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchBusinessinfoHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 my-10 md:my-20">
        <div className="flex justify-center mb-6">
          <img
            src={investhome}
            className="w-48 sm:w-60 md:w-72 lg:w-80"
            alt="Home GIF"
          />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-[#ffffff]"> Turn Your Imagination <br /> Into{" "}</span>
            <span className="text-[#F83002]">Reality</span>
          </h1>
        </div>
        <p className="text-[#ffffff] text-sm sm:text-base md:text-lg">
          Find, Apply & Grab the best opportunity to become the best Investor for
          your favorite Business. <br /> Available Businesses for Luxury things, Startups, Real Estate, Franchise, Trade.
        </p>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="flex w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 mx-auto"
        >
          <input
            type="text"
            placeholder="Find your dreams here"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full px-4 py-2 rounded-full bg-gray-900 text-white placeholder-gray-400 focus:outline-none"
          />
          <Button
            onClick={searchBusinessinfoHandler}
            className="rounded-r-full bg-gray-900"
          >
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
