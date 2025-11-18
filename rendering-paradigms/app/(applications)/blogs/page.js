//"use client"//if i make the whole page a client component then all the child components inside it will also be client components
import React from 'react';
import Link from 'next/link';
import Views from '../../components/Views';
import Comments from '../../components/Comments';
import Button from '../../components/Button';
import Likes from '../../components/Likes';
import { Suspense } from 'react';
import Loading from '@/app/components/Loading';
export const metadata = {
  title: "Blogs",
};

const page = () => {
  return (
    <div>
      <h1>Blogs links</h1>
      {/* <button onClick={()=>console.log("button clicked")}>Click Me...</button> */}
      <ol className='blog-links'>
      {/* <Suspense fallback={<div>Loading views...</div>}>{/*so in views we have a promise of 5sec,if we dont use suspense it will block */}
      {/* if we use suspense here it will block the whole page for 5 sec but with suspense it will show the other components and then after 5 sec it will load the views component */}
      {/* this is streaming concept,getting data in chunks  <Views/></Suspense>  */}
      {/* <Suspense fallback={<Loading>Comments</Loading>}><Comments/></Suspense> */}
      {/* <Suspense fallback ={<Loading children="Likes"/>}><Likes/></Suspense>*/}
      <Likes/>{/*only this code will come to browser as it has "use client" and rest are server side rendering */}
      <Comments/>
      <Views/>
      {/*lets say if we really need a client component like event handler or somthing client side, rather than making the whole page client side we can just add "use client" at top of that particular component by separating it and importing it into the parent component which needs to be rendered on client side */}
      <Button/>{/*this is demonstration of how to make only one component client side */}
      </ol> 
      <Link href="/blogs/1">Blog 1</Link><br />
      <Link href="/blogs/2">Blog 2</Link><br />
      <Link href="/blogs/3">Blog 3</Link><br />
    </div>
  );
};

export default page;
