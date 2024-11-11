import { setAllAdminBusinessinfos } from '@/redux/businessinfoSlice';
import { BUSSINESSINFO_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAdminBusinessinfos = () => {
        const dispatch = useDispatch();
        useEffect(()=>{
           const fetchAllAdminBusinessinfos = async () => {
               try {
                   const res = await axios.get(`${BUSSINESSINFO_API_END_POINT}/getadminbusinessinfos`,{withCredentials:true});
                   if(res.data.success){
                        dispatch(setAllAdminBusinessinfos(res.data.businessinfos));
                   }
               } catch (error) {
                   console.log(error);
               }
           }
           fetchAllAdminBusinessinfos();
        },[])
       
}

export default useGetAllAdminBusinessinfos