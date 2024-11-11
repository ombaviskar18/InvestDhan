import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedBusinessesTable from './AppliedBusinessesTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedBusinessinfos from '@/hooks/useGetAppliedBusinessinfos'
import Footer from './shared/Footer'



const isproof = true;

const Profile = () => {
  useGetAppliedBusinessinfos();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);

  return (
    <div className="bg-gray-900">
        <Navbar />
        <div className='max-w-4xl mx-auto bg-gray-700 text-[#ffff] border border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)} className="text-right"><Pen/></Button>
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                    <Mail />
                    <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <Contact />
                    <span>{user?.phoneNumber}</span>
                </div>
            </div>
            <div className='my-5'>
                <h1>Skills</h1><br />
                <div className='flex items-center gap-1'>
                    {
                       user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                       : <span>NA</span> 
                    }
                </div>
            </div>
            <div className='grid w-full max-w-sm items-center gap-2'>
                <Label className="text-md font-bold">Additional Proof/Certificate/Licence</Label>
                {
                    isproof ? <a target='blank' href={user?.profile?.docproof} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.docOriginalName}</a> : <span>NA</span>
                }
            </div>
            <div className='max-w-4xl mx-auto bg-white text-[#000000] rounded-2xl'>
                <h1 className='font-bold text-lg my-5 text-center'>Applied Businesses</h1>
                <AppliedBusinessesTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
        <Footer/>
    </div>
)
}

export default Profile