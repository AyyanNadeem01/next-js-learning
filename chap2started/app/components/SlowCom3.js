import React from 'react'

const SlowCom3 = async() => {
   
   const Response3=await fetch("https://procodrr.vercel.app/?sleep=5000")  
  const data3=await Response3.json();
 return (
    <div>
        <div className='flex items-center justify-center'>
        {JSON.stringify(data3)}
      </div>

    </div>
  )
}

export default SlowCom3
