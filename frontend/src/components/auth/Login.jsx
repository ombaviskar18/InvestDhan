import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import investlogin from '../../assets/invest_login.gif';
import { Checkbox } from '../ui/checkbox'
import Footer from '../shared/Footer'


const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const {loading, user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
 
    const submitHandler = async (e) => {
      e.preventDefault();
     
      try {
        dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
              headers: { 'Content-Type': "application/json" },
              withCredentials: true,
          });
          
          console.log(res.data.success);
          if (res.data.success) {
              dispatch(setUser(res.data.user));
              navigate("/");
              toast.success(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
      } finally{
        dispatch(setLoading(false));
    }
  }
  useEffect(()=>{
      if(user){
        navigate("/")
      }
  },[])
  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center max-w-5xl mx-auto text-[#ffffff]">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 bg-gray-800 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login to Invest<span className='text-[#F83002]'>Dhan</span></h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input className='text-[#000000]'
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Enter your Gmail" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input className='text-[#000000]'
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="Enter your password"
            minLength="8"
            required />
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
                                <Label htmlFor="option-one">Investor</Label>
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
                                <Label htmlFor="option-two">Entrepreneur/Founder</Label>
                            </div>
                        </RadioGroup>
                    </div>
          
          <div className="my-2">
        <div className="flex items-center space-x-2">
     <Checkbox className='bg-white' required/>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
       <span className='text-sm'> I agree to the <Link to="https://docs.google.com/document/d/1uq1m5Ym0BNayiGMrvoziTxsgCYz6jIrI/edit?usp=drive_link&ouid=107850497397948348057&rtpof=true&sd=true" className='text-blue-600'>Terms and conditions</Link> (This field is mandatory)</span>
      </label>
    </div>

          </div>
          {
            loading ? <Button className="w-full my-4 bg-gray-700"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait </Button> : <Button type="submit" className="w-full my-4 bg-gray-700">Login</Button>
          }
           <div className="flex justify-center my-4">
            <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>SignUp</Link></span>
          </div>
        </form>
      </div>
      <div className="flex justify-center my-4">  
        <img src={investlogin} className='w-80' alt="Login GIF" /> 
      </div>
      <Footer/>
    </div>
    
  );
}

export default Login