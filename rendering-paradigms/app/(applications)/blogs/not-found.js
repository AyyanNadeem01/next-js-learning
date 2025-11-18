"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

export default function (){
    const a=usePathname();
    console.log(a);//we can then split the pathname to get which route is not found
    return <div>Blogs, Sorry, I cant find anything here...</div>
}