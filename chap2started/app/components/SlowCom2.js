import React from 'react'

const SlowCom2 = async() => {
   const Response2=await fetch("https://procodrr.vercel.app/?sleep=3000")  
  const data2=await Response2.json();
 
    return (
    <div>
        <div className='flex items-center justify-center'>
        {JSON.stringify(data2)}
      </div>
      
    </div>
  )
}

export default SlowCom2
