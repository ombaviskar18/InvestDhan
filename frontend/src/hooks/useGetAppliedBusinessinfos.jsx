import { setAllAppliedBusinessinfos } from "@/redux/businessinfoSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedBusinessinfos = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedBusinessinfos = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedBusinessinfos(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedBusinessinfos();
    },[])
};
export default useGetAppliedBusinessinfos;