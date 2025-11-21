// // import { writeFile } from "fs/promises";

// // await writeFile("hello.txt", "Hello, World!");

// // console.log(process.cwd());
// // console.log("written to file!");
// import { readFile } from "fs/promises";

// const data = await readFile("hello.txt", "utf-8");

// console.log(data);
import todosData from "../../todos";
import {writeFile} from "node:fs/promises"
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
export async function POST(request) {
  const todo=await request.json()
  console.log(todo);
  const newTodo={
    id:crypto.randomUUID(),
    text:todo.text,
    completed:false,
  }
  todosData.push(newTodo)
  await writeFile("todos.json",JSON.stringify(todosData,null,2))
  return Response.json(newTodo)
}