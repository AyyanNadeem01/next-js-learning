import React from 'react'

const Likes =async () => {
    await new Promise((resolve)=>setTimeout(resolve,3000)) //simulating delay
  return (
    <div>
      5k likes
    </div>
  )
}

export default Likes
