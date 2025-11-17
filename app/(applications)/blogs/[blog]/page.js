import { notFound } from 'next/navigation';
import React from 'react';
// 1. What is Incremental Static Regeneration (ISR)?
// ISR is a Next.js feature that allows statically generated pages (SSG) to be updated after build time without rebuilding the entire site.
// You pre-render pages at build time (SSG)
// Then Next.js can revalidate them in the background after a certain interval
// 2. Key point
// ISR requires SSG.
// Why?
// If a page is SSR (server-side rendered), it already runs on every request, so there’s no “regeneration” step.
// ISR only makes sense for pages pre-rendered at build time (static) to get updates periodically.

//these things will be tested only in production build not in dev mode
export const dynamicParams = false;//by default it is true //this will not allow any new dynamic route other than the one which is pre generated at build time
export const revalidate=false;//this will disable the isr and the page will be statically generated at build time only
//if we set it to true then the page will be regenerated at every request
//export const revalidate=10//if we set it to some number like 10 , then the page will be regenerated after every 10 seconds but only when there is a request for that page

export async function generateStaticParams() {//these will be generated at build time
  const respnse=await fetch("https://jsonplaceholder.typicode.com/todos")
  // const respnse=await fetch("https://jsonplaceholder.typicode.com/todos",
  //   {next:{revalidate:100}})//this fetch will be revalidated after 100 seconds, it is same as defining revalidate above but this is only for this fetch request

  const data=await respnse.json()//now the data for fake api is statically generated at build time and 
  // will not be fetched at runtime and also the dynamic routes will be pre generated at build time and
  //  for above 200 id then the blog will be rendered at runtime
  //for every id which is not pre generated the first request will take time as it will be generated at runtime
  //and one generated , then next time it will be served from cache and use already generated code from server
  console.log(data)
//one more thing to note if the page has some dynamic data to display then the variable revalidate will work otherwise it will not work
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
    <h1>Date: {new Date().toString()}</h1>{/*in development it will upload on reload but on build mode it will not change if revalidate
    =false as it will generate only once at build time and if we set revalidate = any number let say n, it will be generated after 
    n second and note on user request of page new update page will show with increasing intervals of 5secs*number of cycle passed from last request*/}
    </div>
  );
};

export default page;
