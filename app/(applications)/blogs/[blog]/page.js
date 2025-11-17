import { notFound } from 'next/navigation';
import React from 'react';
//these things will be tested only in production build not in dev mode
export const dynamicParams = false;//by default it is true //this will not allow any new dynamic route other than the one which is pre generated at build time
export async function generateStaticParams() {//these will be generated at build time
  const respnse=await fetch("https://jsonplaceholder.typicode.com/todos")
  const data=await respnse.json()//now the data for fake api is statically generated at build time and 
  // will not be fetched at runtime and also the dynamic routes will be pre generated at build time and
  //  for above 200 id then the blog will be rendered at runtime
  //for every id which is not pre generated the first request will take time as it will be generated at runtime
  //and one generated , then next time it will be served from cache and use already generated code from server
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
