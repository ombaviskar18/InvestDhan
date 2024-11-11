import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BusinessinfosTable from './BusinessinfosTable'
import useGetAllAdminBusinessinfos from '@/hooks/useGetAllAdminBusinessinfos'
import { setSearchBusinessinfoByText } from '@/redux/businessinfoSlice'
import Footer from '../shared/Footer'
import invest from '../../assets/invest.gif';


const Businessinfos = () => {
    useGetAllAdminBusinessinfos();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchBusinessinfoByText(input));
    },[input]);
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name,role etc."
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className="bg-gray-700" onClick={() => navigate("/admin/businessinfos/create")}>Post New Business</Button>
                </div>
                <BusinessinfosTable/>
            </div>
            <div className="flex justify-center my-4">  
        <img src={invest} className='w-96' alt="Login GIF" /> 
      </div>
            <Footer/>
    </div>    
  )
}

export default Businessinfos