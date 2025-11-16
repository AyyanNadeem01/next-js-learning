import { notFound } from 'next/navigation';
import React from 'react';
export function generateStaticParams() {//these will be generated at build time
  return [
    {
      blog: "1",
    },
    {
      blog: "2",
        },    
        {
      blog: "3",
    }, {
      blog: "4",
        },    
        {
      blog: "5",
    }
  ];
}
const page = async({ params }) => {
  const { blog } = await params; // no need for 'await' here, params is synchronous

  // Check if blog is a number
  const checkIsNumber = () => !isNaN(blog);

  if (!checkIsNumber()) {
    notFound(); 
  }

  return (
    <div>
      Blog dynamic data getting from URL last part: {blog}
    </div>
  );
};

export default page;
