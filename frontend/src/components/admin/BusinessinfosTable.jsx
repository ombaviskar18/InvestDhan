import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BusinessinfosTable = () => {
    const {allAdminBusinessinfos, searchBusinessinfoByText} = useSelector(store=>store.businessinfo);
    const [filterBusinessinfos, setFilterBusinessinfos] = useState(allAdminBusinessinfos);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredBusinessinfos = allAdminBusinessinfos.filter((businessinfo)=>{
            if(!searchBusinessinfoByText){
                return true
            };
            return businessinfo?.title?.toLowerCase().includes(searchBusinessinfoByText.toLowerCase()) || businessinfo?.business?.name.toLowerCase().includes(searchBusinessinfoByText.toLowerCase());

        });
        setFilterBusinessinfos(filteredBusinessinfos);
    },[allAdminBusinessinfos,searchBusinessinfoByText])
  return (
    <div className='text-[#ffffff]'>
        <Table>
                <TableCaption>A list of your recent posted Businesses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                                filterBusinessinfos?.map((businessinfo) => (
                                     <tr>
                                        <TableCell>{businessinfo?.business?.name}</TableCell>
                                        <TableCell>{businessinfo?.title}</TableCell>
                                        <TableCell>{businessinfo?.createdAt.split("T")[0]}</TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-52">
                                                    <div onClick={()=> navigate(`/admin/businessinfos/${businessinfo._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                        <Eye className='w-4'/>
                                                        <span>Applied Investors</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                 </tr>
                                    
                                ))
                             }
                </TableBody>
            </Table>
    </div>
  )
}

export default BusinessinfosTable