import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import investsignup from '../../assets/sign.gif';
import Footer from '../shared/Footer';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();    // formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='bg-gray-900'>
            <Navbar />
            <div className="flex justify-center my-4">
                <img src={investsignup} className='w-32 md:w-40' alt="Signup GIF" />
            </div>
            <div className="flex items-center justify-center max-w-7xl mx-auto text-[#ffffff] px-4">
                <form onSubmit={submitHandler} className="w-full md:w-1/2 border bg-gray-800 border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input
                            className='text-[#000000]'
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your Fullname"
                            minLength="10"
                            required
                        />
                    </div>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            className='text-[#000000]'
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your Gmail"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input
                            className='text-[#000000]'
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter your Phone number"
                            pattern="\d{10}"
                            maxLength="10"
                            required
                        />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input
                            className='text-[#000000]'
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            minLength="8"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between my-5">
                        <RadioGroup className="flex flex-wrap items-center gap-4">
                            <Label className='whitespace-nowrap'>Choose your Role: </Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Investor"
                                    checked={input.role === 'Investor'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Investor</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Entrepreneur or Founder"
                                    checked={input.role === 'Entrepreneur or Founder'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Entrepreneur/Founder</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="flex items-center gap-2 my-4">
                        <Label>Profile Picture</Label>
                        <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
                    </div>
                    {
                        loading 
                        ? <Button className="w-full my-4 bg-gray-700"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait </Button>
                        : <Button type="submit" className="w-full my-4 bg-gray-700">SignUp</Button>
                    }
                    <div className="flex justify-center my-4">
                        <span className="text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600">
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Signup;
