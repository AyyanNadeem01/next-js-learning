// // import { writeFile } from "fs/promises";

// // await writeFile("hello.txt", "Hello, World!");

// // console.log(process.cwd());
// // console.log("written to file!");
// import { readFile } from "fs/promises";

// const data = await readFile("hello.txt", "utf-8");

// console.log(data);
import todosData from "../../todos";

export function GET(request) {
  console.log(request)
  return Response.json(todosData);

  //   return new Response(JSON.stringify(todosData), {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     status: 200,
  //     statusText: "ProCodrr",
  //   });
}