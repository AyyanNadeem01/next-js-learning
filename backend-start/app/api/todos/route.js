// // // import { writeFile } from "fs/promises";

// // // await writeFile("hello.txt", "Hello, World!");

// // // console.log(process.cwd());
// // // console.log("written to file!");
// // import { readFile } from "fs/promises";

// // const data = await readFile("hello.txt", "utf-8");

// // console.log(data);
// import { readFile } from "node:fs/promises";
// import todosData from "../../todos";
// import {writeFile} from "node:fs/promises"
// import {connectDB} from "@/lib/connectDB";
// import Todo from "@/models/todoModel";
// export async function GET() {
//   await connectDB();

//   // const newTodo = await Todo.create({
//   //   text: "Learn JavaScript"
//   // });
//   // console.log(newTodo);

//   // const todoJSONString = await readFile("todos.json", "utf-8");
//   // const todos = JSON.parse(todoJSONString);
//   // console.log("File todos:", todos);

//   const todos = await Todo.find().lean();

//   const formatted = todos.map(t => ({
//     id: t._id.toString(),
//     text: t.text,
//     completed: t.completed
//   }));

//   return Response.json(formatted);
// }

// export async function POST(request) {
//   // const todo=await request.json()
//   // console.log(todo);
//   // const newTodo={
//   //   id:crypto.randomUUID(),
//   //   text:todo.text,
//   //   completed:false,
//   // }
//   // todosData.push(newTodo)
//   // await writeFile("todos.json",JSON.stringify(todosData,null,2))
//   // return Response.json(newTodo,{status:201})
//   const todo=await request.json()
//   const newTodo=await Todo.create({
//     text:todo.text
//   })
//   return Response.json(newTodo,{
//     status:201,
//   })
// }
import { getLoggedInUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import Todo from "@/models/todoModel";
import User from "@/models/userModel";
import { cookies } from "next/headers";

export async function GET() {
  await connectDB();
  const user = await getLoggedInUser();
  if (user instanceof Response) {
    return user;
  }
  const allTodos = await Todo.find({ userId: user.id });

  return Response.json(
    allTodos.map(({ id, text, completed }) => ({ id, text, completed }))
  );
}

export async function POST(request) {
  await connectDB();
  const user = await getLoggedInUser();
  if (user instanceof Response) return user;

  const todo = await request.json();
  const { id, text, completed } = await Todo.create({
    text: todo.text,
    userId: user.id,
  });

  return Response.json(
    { id, text, completed },
    {
      status: 201,
    }
  );
}