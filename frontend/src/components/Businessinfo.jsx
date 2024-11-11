import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Businessinfo = ({businessinfo}) => {
    const navigate = useNavigate();
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
    <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(businessinfo?.createdAt) == 0 ? "Today" :  `${daysAgoFunction(businessinfo?.createdAt)} days ago`}</p>
        
    </div>

    <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
            <Avatar>
                <AvatarImage src={businessinfo?.business?.logo} />
            </Avatar>
        </Button>
        <div>
            <h1 className='font-medium text-lg'>{businessinfo?.business?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
    </div>
        <div>
                <h1 className='font-bold text-lg my-2'>{businessinfo?.title}</h1>
                <p className='text-sm text-gray-600'>{businessinfo?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">Investors:{businessinfo?.investors}</Badge>
            <Badge className='text-[#F83002] font-bold bg-white' variant="ghost">Equity: {businessinfo?.investorType} %</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">Amount:₹{businessinfo?.amount }</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button className="bg-gray-800" onClick={()=> navigate(`/description/${businessinfo?._id}`)}>Details</Button>            </div>
    </div>
  )
}

export default Businessinfo