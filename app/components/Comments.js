import React from 'react'

const Comments = async() => {
   await new Promise((resolve)=>setTimeout(resolve,3000)) //simulating delay
   return (
    <div>
      2000 comments
    </div>
  )
}

export default Comments
