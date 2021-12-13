import React, { useState, useEffect } from "react";
import axios from "axios";

const GET_DEVICES = 'http://localhost:3000/devices'

export const useFetchDevices = (successData) => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
  
    console.log('successData', successData)

    useEffect(() => {
        console.log('entered fetch')
        setError(false)
        setIsLoading(true)
        axios.get(GET_DEVICES).then(({ data }) => {
            setList(data)
        }).catch((err) => {
            setError(true)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [successData])

    return { isLoading, list, error, setError };
}