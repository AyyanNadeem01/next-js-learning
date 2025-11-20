"use client";//this is global error handling file and will handle error occuring in layout or page level
//this work only in production build
import "./globals.css"
export default function GlobalError( ){

  return (
<html lang="en" className="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
</head>
<body>
        <div>
      <p>Something went wrong in layout page</p>
      <p>Try to reload the page!</p>{/*HANDLING,SOME TIME ERROR OCCUR,, SOMETIME NOT */}
      <button onClick={()=>window.location.reload()}>Try Again</button>
    </div>
</body>
</html>
  );
}