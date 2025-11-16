import React from 'react'
export async function generateMetadata({params}){
  const {blog}=await params
  return {
    title:`Comments for ${blog}`
  }
}
const page = async({params}) => {
    const {blog}=await params
  return (
    <div>
      comments {blog}
    </div>
  )
}

export default page
