"use client"
import { useState } from 'react';
const About = () => {
  const [fruits,setFruits] = useState(['apple','banana','orange']);//this is a client side code and will not crash the build
 // console.dir(error)
  return (
    <>
      <div>
        <h1 className='title'>About Us</h1>
        <p>We are a company dedicated to providing quality services.</p>
      
  <button onClick={()=>setFruits(null)}>Click me</button></div>{/*this is a client side error and will crash the build*/}{/*after i maded error.js , now it will be handled*/}
  {/* <button onClick={()=>console.log(object)}>Click me</button></div>this is a client side error and will not crash the build as it is not stopping rendering */}
  
    {fruits.map((fruit)=>(
      <p key={fruit}>{fruit}</p>
    ))}
    </>
  );
};

export default About;