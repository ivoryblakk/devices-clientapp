import React, { useState, useEffect } from "react";
import axios from "axios";


const POST_DEVICES = 'http://localhost:3000/devices'
const headers = {'Content-Type': 'application/json'}

export const usePostDevice = () => {
    const[postDataSuccess, setPostDataSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [postData, setPostData] = useState('')

    useEffect(() => {
        if(postData){
        setError('')
        setIsLoading(true)
        console.log('entered post')
        axios.post(POST_DEVICES, JSON.stringify(postData), {headers}).then(({ data }) => {
            console.log('successPostData',data)
            console.log('setSuccessPostData',postDataSuccess)
            setPostDataSuccess(data)
        }).catch((err) => {
            setError(err)
        }).finally(() => {
            setPostData('')
            setIsLoading(false)
        })}
    }, [postData])

    return { isLoading, setPostData , error};
}