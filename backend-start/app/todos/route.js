// // import { writeFile } from "fs/promises";

// // await writeFile("hello.txt", "Hello, World!");

// // console.log(process.cwd());
// // console.log("written to file!");
// import { readFile } from "fs/promises";

// const data = await readFile("hello.txt", "utf-8");

// console.log(data);
import { readFile } from "node:fs/promises";
import todosData from "../../todos";
import {writeFile} from "node:fs/promises"
import { todo } from "node:test";
export async function GET(request) {
  console.log(request)
   const todoJSONString=await readFile("todos.json","utf-8")
   const todos=JSON.parse(todoJSONString)
   return Response.json(todos);

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
  return Response.json(newTodo,{status:201})
}