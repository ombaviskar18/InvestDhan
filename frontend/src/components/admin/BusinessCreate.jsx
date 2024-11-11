import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BUSINESS_API_END_POINT } from '@/utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleBusiness } from '@/redux/businessSlice';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import businesspic from '../../assets/business.gif';
import Footer from '../shared/Footer';


const BusinessCreate = () => {
  const navigate = useNavigate();
  const [businessSuffix, setBusinessSuffix] = useState(''); // User-editable part of the business name
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  const registerNewBusiness = async () => {
    if (!selectedCategory) {
      toast.error('Please select a category.');
      return;
    }

    const businessName = `${selectedCategory} ${businessSuffix}`;

    if (!businessSuffix) {
      toast.error('Please enter a business name.');
      return;
    }

    try {
      const res = await axios.post(`${BUSINESS_API_END_POINT}/register`, { businessName }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setSingleBusiness(res.data.business));
        toast.success(res.data.message);
        const businessId = res?.data?.business?._id;
        navigate(`/admin/businesses/${businessId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setBusinessSuffix(''); // Reset the editable part when category changes
  };

  const handleBusinessNameChange = (e) => {
    setBusinessSuffix(e.target.value);
  };

  return (
    <div className='text-[#ffffff] bg-gray-900'>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Enter Your Business Category</h1>
          <p className='text-gray-500'>
            Welcome to InvestDhan start your business by selecting category and name of business.
          </p>
        </div>

        <Label>Select a Business Category</Label>
        <Select onValueChange={handleCategoryChange} required>
          <SelectTrigger className="w-full my-2 text-[#000000]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Franchise of">Franchise of</SelectItem>
            <SelectItem value="Startup of">Startup of</SelectItem>
            <SelectItem value="Real Estate">Real Estate</SelectItem>
            <SelectItem value="Luxury Thing">Luxury Thing</SelectItem>
            <SelectItem value="Mutual Funds">Mutual Funds</SelectItem>
            <SelectItem value="Trade">Trade</SelectItem>
          </SelectContent>
        </Select>

        <Label>Enter your Business Name</Label>
        <div className="relative text-[#000000]">
          {selectedCategory && (
            <div className="absolute top-2 left-2  px-2  rounded">
              {selectedCategory}
            </div>
          )}
          <Input 
            type="text"
            className="my-2 pl-32 text-sm text-[#000000]" 
            placeholder="Business Name"
            value={businessSuffix}
            onChange={handleBusinessNameChange}
            required
            disabled={!selectedCategory} // Disable input if no category selected
          />
        </div>

        <div className='flex items-center gap-2 my-10 text-[#000000]'>
          <Button variant="outline" onClick={() => navigate("/admin/businesses")}>Cancel</Button>
          <Button className='bg-gray-700' onClick={registerNewBusiness}>Continue</Button>
        </div>
      </div>
      <div className="flex justify-center my-4">  
      <img src={businesspic}  alt="Login GIF" /> 
      </div>
      <Footer/>
    </div>
  );
};

export default BusinessCreate;
