//next js support only one middleware function per project
export const middleware = (request) => {
  if (request.cookies.get("userId")) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return Response.redirect(new URL("/", request.nextUrl.origin));
    }
  } else if (request.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/login", request.nextUrl.origin));
  }
};

export const config = {
  matcher: ["/", "/login", "/register"],
};

//next js provide us with next response object to manipulate the response and rewrite the url meant we can change the url
//example: if user try to access /home we can rewrite the url to /
// import { NextResponse } from "next/server";

// export const middleware = (request) => {
//   return NextResponse.rewrite(new URL("/", request.nextUrl.origin));
// };

// export const config = {
//   matcher: ["/home"],
// };


//for next js middleware is always avaible in edge runtime so we cant use node js modules like fs or path or any other module that rely on node js apis
//so if we import "fs" in middleware file it will throw error like "fs module is not found" because fs module is a node js module and node js modules are not avaible in edge runtime
//but in normal files like page.js or api route we can use node js modules because those files are not executed in edge runtime

//lets say we had a page /about, a  server component , and we want that it should be in edge runtime then we can make it using below code
//export const runtime = "edge";//this will make the about page to be executed in edge runtime. it will not support node js modules