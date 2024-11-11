import React from 'react';
import LatestBusinessCards from './LatestBusinessCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestBusiness = () => {
  const { allBusinessinfos } = useSelector(store => store.businessinfo);
  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <motion.div whileHover={{ scale: 0.95 }} className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="text-[#F83002]">Latest & Trending </span>
          <span className="text-[#ffffff]">Businesses</span>
        </h1>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allBusinessinfos.length <= 0 ? (
          <span className="col-span-full text-center text-gray-400">No Business Available</span>
        ) : (
          allBusinessinfos.slice(0, 6).map((businessinfo) => (
            <LatestBusinessCards key={businessinfo._id} businessinfo={businessinfo} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestBusiness;
