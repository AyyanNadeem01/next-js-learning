import React from 'react'

const page = async({params}) => {
    const {blog}=await params
  return (
    <div>
      comments {blog}
    </div>
  )
}

export default page
