import { notFound } from 'next/navigation';
import React from 'react';
export async function generateStaticParams() {//these will be generated at build time
  const respnse=await fetch("https://jsonplaceholder.typicode.com/todos")
  const data=await respnse.json()//now the data for fake api is statically generated at build time and will not be fetched at runtime and also the dynamic routes will be pre generated at build time and for above 200 id then the blog will be rendered at runtime
  console.log(data)
  return data.map((id)=>({blog:`${id}`}))
  // return [
  //   {    blog: "1",
  //   },
  //   {
  //     blog: "2",
  //       },    
  //       {
  //     blog: "3",
  //   }, {
  //     blog: "4",
  //       },    
  //       {
  //     blog: "5",
  //   }
  // ];
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
