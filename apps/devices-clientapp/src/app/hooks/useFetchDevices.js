import React, {useState,useEffect,useMemo} from "react";
import axios from "axios";

const GET_DEVICES = 'http://localhost:3000/devices'

export const useFetchDevices =()=>{
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    // const memoizedDeviceList = useMemo(devices => {
    //     setList(devices)
    //   }, [list])

    
    useEffect(()=>{ 
        setIsLoading(true)
        axios.get(GET_DEVICES).then( ({data}) =>{
            setList(data)}).finally(()=>{
            setIsLoading(false)
        })    
    },[])
    

    return {isLoading,list};
}