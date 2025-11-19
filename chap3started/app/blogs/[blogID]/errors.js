"use client";
import {startTransition} from "react"
import {useRouter} from "next/navigation"
export default function Error({ error,reset }) {
 const router= useRouter()
  //   console.dir(error);
//   console.log(error.digest);
//   console.log(error.message);
  return (
    <div>
      <p>Something went wrong</p>
      <p>Try to reload the page!</p>{/*HANDLING,SOME TIME ERROR OCCUR,, SOMETIME NOT */}
      <button onClick={()=>{
        startTransition(()=>{//it wait data till come
        router.refresh()//this send request till server
        reset()
        })}}>Try Again</button>
    </div>
  );
}