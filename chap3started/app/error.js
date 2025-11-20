"use client";
export default function Error({ error,reset }) {

  return (
    <div>
      <p>Something went wrong in home page</p>
      <p>Try to reload the page!</p>{/*HANDLING,SOME TIME ERROR OCCUR,, SOMETIME NOT */}
      <button onClick={()=>reset()}>Try Again</button>
    </div>
  );
}