import React from 'react'

const Views = async() => {
    await new Promise((resolve)=>setTimeout(resolve,3000)) //simulating delay
  return (
    <div>
      10k Views
    </div>
  )
}

export default Views
