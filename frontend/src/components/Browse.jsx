import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Businessinfo from './Businessinfo';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/businessinfoSlice';
import useGetAllBusinessinfos from '@/hooks/useGetAllBusinessinfos';
import { motion } from 'framer-motion';
import investhome from '../assets/invest_business.gif';
import Footer from './shared/Footer';

const Browse = () => {
  useGetAllBusinessinfos();
  const { allBusinessinfos } = useSelector((store) => store.businessinfo);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl my-10 text-[#ffffff]">
          Search Results ({allBusinessinfos.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBusinessinfos.map((businessinfo) => (
            <motion.div
              key={businessinfo._id}
              whileHover={{ scale: 1.05 }}
              className="transition-transform"
            >
              <Businessinfo businessinfo={businessinfo} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center my-10">
          <img src={investhome} className="w-60 sm:w-80" alt="Home GIF" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
