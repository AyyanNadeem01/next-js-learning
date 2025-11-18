"use client"
import React from 'react'

//const Comments = async() => {
const Comments = () => {
     //await new Promise((resolve)=>setTimeout(resolve,3000)) //simulating delay
  // if(typeof window==="undefined"){
  //   return <div>500 comments server...</div>
  // }//this causes hydration error in the browser because there is different content on server and client
  // //but lets say if content is same on server and client after some delay then its fine
  // if(typeof window==="undefined"){
  //   return <div>500 comments client...</div>
  // }//this is fine as content is same on server and client

  return (
    <div>
      500 comments client...{/*Data.now()*/}{/*this data.now() will be different on server and client causing hydration error*/} 
    </div>
  )
}

export default Comments
