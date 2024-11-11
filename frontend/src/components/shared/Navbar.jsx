import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu } from "lucide-react"; // Importing Menu icon for the hamburger
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-gray-800 shadow">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
      <motion.div
          whileHover={{ scale: 1.2 }}>
        <Link to="/">
          <h1 className="text-2xl font-bold">
          <span className="text-[#ffffff]">Invest</span><span className="text-[#F83002]">Dhan</span>
          </h1>
          </Link> 
        </motion.div>
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className={`flex-1 flex-col items-center justify-end gap-12 md:flex ${menuOpen ? 'flex' : 'hidden'} md:flex-row`}>
          <ul className="flex flex-col md:flex-row font-medium items-center gap-5 text-[#ececec]">
            {user && user.role === 'Entrepreneur or Founder' ? (
              <>
                <li>
                  <Link to="/admin/businesses">Category</Link>
                </li>
                <li>
                  <Link to="/admin/businessinfos">Businesses</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/business">Businesses</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
               <div className="flex flex-col md:flex-row items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-black hover:bg-slate-700">SignUp</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === 'Investor' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-center gap-4 py-4">
            {user && user.role === 'Entrepreneur or Founder' ? (
              <>
                <li>
                  <Link to="/admin/businesses">Category</Link>
                </li>
                <li>
                  <Link to="/admin/businessinfos">Businesses</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/business">Businesses</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
            {!user ? (
              <div className="flex flex-col items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-black hover:bg-slate-700">SignUp</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                {user.role === 'Investor' && (
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button onClick={logoutHandler} variant="link">
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
