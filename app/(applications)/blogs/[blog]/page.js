import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({params}) => {
  console.log(await params)
  const {blog} = await params
  console.log(blog)
  const checkIsNumber=()=>{
    return isNaN(blog)
  }
  if (checkIsNumber(blog)){
    notFound();
  }
  return (
    <div>
     blog dynamic data getting from url last part: {blog}
    </div>
  )
}

export default page
