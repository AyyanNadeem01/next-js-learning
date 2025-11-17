import React from 'react';
import Link from 'next/link';
import Views from '../../components/Views';
import Comments from '../../components/Comments';
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
      <ol className='blog-links'>
      <Suspense fallback={<div>Loading views...</div>}>{/*so in views we have a promise of 5sec,if we dont use suspense it will block
      the whole page for 5 sec but with suspense it will show the other components and then after 5 sec it will load the views component **/}
      {/* this is streaming concept,getting data in chunks*/}  <Views/></Suspense> 
      <Suspense fallback={<Loading>Comments</Loading>}><Comments/></Suspense>
      <Suspense fallback ={<Loading children="Likes"/>}><Likes/></Suspense>
      </ol>
      <Link href="/blogs/1">Blog 1</Link><br />
      <Link href="/blogs/2">Blog 2</Link><br />
      <Link href="/blogs/3">Blog 3</Link><br />
    </div>
  );
};

export default page;
