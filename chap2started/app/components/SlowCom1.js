import React from 'react'

const SlowCom1 = async() => {
   const Response1=await fetch("https://procodrr.vercel.app/?sleep=0001")  
  const data1=await Response1.json();
 
 
    return (
    <div>
        <div className='flex items-center justify-center'>
        {JSON.stringify(data1)}
      </div>
    </div>
  )
}

export default SlowCom1
