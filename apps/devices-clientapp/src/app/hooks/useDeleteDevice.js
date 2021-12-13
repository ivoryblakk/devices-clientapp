import React, { useState, useEffect } from "react";
import axios from "axios";

const DELETE_DEVICE = 'http://localhost:3000/devices'

export const useDeleteDevice = () => {
    const [deleteData, setDeleteData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [deleteId, setDeleteId] = useState('')

    useEffect(() => {
        setError('')
        setIsLoading(true)
        axios.delete(`${DELETE_DEVICE}/${deleteId}`).then(({ data }) => {
            setDeleteData(data)
        }).catch((err) => {
            setError(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [postData])

    return { isLoading, deleteData, setDeleteId, error, setError };
}