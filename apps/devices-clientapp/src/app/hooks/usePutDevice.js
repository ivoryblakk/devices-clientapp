import React, { useState, useEffect } from "react";
import axios from "axios";

const PUT_DEVICE = 'http://localhost:3000/devices'

export const usePutDevice = () => {
    const [successData, setSuccessData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [postData, setPostData] = useState('')

    useEffect(() => {
        setError('')
        setIsLoading(true)
        axios.put(`${PUT_DEVICE}/${postData.id}`).then(({ data }) => {
            setSuccessData(data)
        }).catch((err) => {
            setError(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [postData])

    return { isLoading, successData, setPostData, error };
}