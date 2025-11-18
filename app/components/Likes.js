"use client"//this makes this component a client component
import React, { useState } from 'react'

//const Likes =async () => {//as async not allowed in client component
 const Likes = () => {
  //   await new Promise((resolve)=>setTimeout(resolve,3000)) //simulating delay
 //console.log(window)//this will give error as window is not defined on server side  -
 //console.log(localStorage)//this will give error as localStorage is not defined on server side
  //console.log(localStorage)//now this will work as this is client component because of "use client" directive at top
  //useState(0)//this will also work now as useState is react hook and only works in client components
  const [likesCount,setLikesCount]=useState(0); 
  if (typeof window !== 'undefined'){
    console.log(localStorage)
 }//to make sure this code runs only on client side
  return (
    <div  onClick={()=>setLikesCount((prev)=>prev+1)}>{/*more like onClick={handleClick} also will not work untill it is made client component */}
      5k likes {likesCount}
    </div>
  )
}
//client code run on client and server both
//server code run on server only
export default Likes
