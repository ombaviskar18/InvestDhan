import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, BUSSINESSINFO_API_END_POINT } from '@/utils/constant';
import { setSingleBusinessinfo } from '@/redux/businessinfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import detail from '../assets/detail.gif';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const BusinessDescription = () => {
    const { singleBusinessinfo } = useSelector(store => store.businessinfo);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleBusinessinfo?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const businessinfoId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyBusinessinfoHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${businessinfoId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updateSingleBusinessinfo = { ...singleBusinessinfo, applications: [...singleBusinessinfo.applications, { applicant: user?._id }] };
                dispatch(setSingleBusinessinfo(updateSingleBusinessinfo));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleBusinessinfo = async () => {
            try {
                const res = await axios.get(`${BUSSINESSINFO_API_END_POINT}/get/${businessinfoId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleBusinessinfo(res.data.businessinfo));
                    setIsApplied(res.data.businessinfo.applications.some(application => application.applicant == user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleBusinessinfo();
    }, [businessinfoId, dispatch, user?._id]);

    return (
        <div className='bg-gray-900'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
                <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl my-8 text-white text-center'>Business Description 💸</h1>
                
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0'>
                    <div className='flex-1'>
                        <h1 className='font-bold text-lg sm:text-xl lg:text-2xl text-white'>{singleBusinessinfo?.title}</h1>
                        <div className='flex flex-wrap items-center gap-2 mt-4'>
                            <Badge className='text-blue-700 font-bold bg-white' variant="ghost">Investors: {singleBusinessinfo?.investors}</Badge>
                            <Badge className='text-[#F83002] font-bold bg-white' variant="ghost">Equity: {singleBusinessinfo?.investorType} %</Badge>
                            <Badge className='text-[#7209b7] font-bold bg-white' variant="ghost">Amount: ₹{singleBusinessinfo?.amount}</Badge>
                        </div>
                        <Button onClick={() => navigate("/")} variant="outline" className="mt-4 gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyBusinessinfoHandler}
                        className={`mt-4 md:mt-0 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <h1 className='border-b-2 border-b-gray-300 text-white font-medium py-4 mt-6'>Business Information</h1>
                <div className='my-4 text-white space-y-2'>
                    <h1 className='font-bold'>Category: <span className='font-normal'>{singleBusinessinfo?.title}</span></h1>
                    <h1 className='font-bold'>Location: <span className='font-normal'>{singleBusinessinfo?.location}</span></h1>
                    <h1 className='font-bold'>Description: <span className='font-normal'>{singleBusinessinfo?.description}</span></h1>
                    <h1 className='font-bold'>Investors Needed: <span className='font-normal'>{singleBusinessinfo?.investors}</span></h1>
                    <h1 className='font-bold'>Amount: <span className='font-normal'>{singleBusinessinfo?.amount}</span></h1>
                    <h1 className='font-bold'>Total Investors Applied: <span className='font-normal'>{singleBusinessinfo?.applications?.length}</span></h1>
                    <h1 className='font-bold'>Posted Date: <span className='font-normal'>{singleBusinessinfo?.createdAt.split("T")[0]}</span></h1>
                </div>

                <div className='flex justify-center my-4'>
                    <img src={detail} className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg' alt="Detail Illustration" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BusinessDescription;
