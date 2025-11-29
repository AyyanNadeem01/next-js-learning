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