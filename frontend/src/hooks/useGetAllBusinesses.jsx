import { setBusinesses } from '@/redux/businessSlice';
import { BUSINESS_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllBusinesses = () => {
        const dispatch = useDispatch();
        useEffect(()=>{
           const fetchBusinesses = async () => {
               try {
                   const res = await axios.get(`${BUSINESS_API_END_POINT}/get`,{withCredentials:true});
                   if(res.data.success){
                        dispatch(setBusinesses(res.data.businesses));
                   }
               } catch (error) {
                   console.log(error);
               }
           }
           fetchBusinesses();
        },[])
       
}

export default useGetAllBusinesses