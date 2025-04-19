"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';


const page = () => {
    const router = useRouter()
    useEffect(() => {
        router.push("/student")
    })
    return (
        null
    )
}

export default page