import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { BUSSINESSINFO_API_END_POINT} from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'

const businessArray = [];

const PostBusinessinfo = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        amount: "",
        location: "",
        investorType: "",
        investors: 0,
        businessId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { businesses } = useSelector(store => store.business);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedBusiness = businesses.find((business)=> business.name.toLowerCase() === value);
        setInput({...input, businessId:selectedBusiness._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${BUSSINESSINFO_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/businessinfos");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5 text-[#ffffff]'>
                <form onSubmit = {submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                <h1 className='font-bold text-xl text-center text-[#ffffff]'>Add Your Business💸</h1><br /><br />
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input  
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-[#000000]"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input 
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-[#000000]"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input 
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-[#000000]"
                            />
                        </div>
                        <div>
                            <Label>Amount</Label>
                            <Input 
                                type="text"
                                name="amount"
                                value={input.amount}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-[#000000]"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input 
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-[#000000]"
                            />
                        </div>
                        <div>
                            <Label>Investor Equity(%)</Label>
                            <Input 
                                type="text"
                                name="investorType"
                                value={input.investorType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-[#000000]"
                            />
                        </div>
                        <div>
                            <Label>No of Investors</Label>
                            <Input 
                                type="number"
                                name="investors"
                                value={input.investors}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 text-[#000000]"
                            />
                        </div> 
                        <div>
                        <Label >Select the Business</Label>
                        {
                        businesses.length > 0 && (
                            <Select onValueChange={selectChangeHandler} >
                                <SelectTrigger className="w-full sm:w-[180px] text-[#000000]">
                                    <SelectValue placeholder="Select a Business" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            businesses.map((business) => (
                                                <SelectItem key={business?.id} value={business?.name?.toLowerCase()}>
                                                    {business.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }

                        </div>
                    </div> 
                    {
                        loading ? <Button className="w-full my-4 bg-gray-700"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-gray-700">Post New Business</Button>
                    }
                    {
                        businesses.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a Business Category first, before posting a Business</p>
                    }
                </form>
            </div>
      <Footer/>
        </div>
    )
}

export default PostBusinessinfo