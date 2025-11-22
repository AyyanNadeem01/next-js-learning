import Todo from "@/models/todoModel";
import todosData from "../../../todos";
import {writeFile} from "node:fs/promises"
import {connectDB} from "@/lib/connectDB";
export async function GET(_,{params}) {
  const {id}=await params
  const todo=await todosData.find((todo)=>todo.id===parseInt(id))
  console.log(todo)
  if(!todo){
    return Response.json({error:"Todo not found"},{status:404})
  }
  return Response.json(todo);

}
export async function PUT(request, { params }) {
  // const editTodoData = await request.json();
  // const { id } = await params;

  // const index = todosData.findIndex(todo => String(todo.id) === String(id));
  // if(editTodoData.id){
  //   return Response.json(
  //     { error: "Cannot edit todo id" },
  //     { status: 403 }
  //   )
  //   }
  // if (index === -1) {
  //   return Response.json(
  //     { error: `Todo with id ${id} not found` },
  //     { status: 404 }
  //   );
  // }

  // const updatedTodo = {
  //   ...todosData[index],
  //   ...editTodoData
  // };

  // todosData[index] = updatedTodo;

  // await writeFile("todos.json", JSON.stringify(todosData, null, 2));

  // return Response.json(updatedTodo);
  const editTodoData = await request.json();
  const {id}=await params
  const editedTodo=await Todo.findByIdAndUpdate(id,editTodoData,{
    new:true,
  //  runValidators:true
  })
  return Response.json(editedTodo)
  
}

export async function DELETE(_,{params}){
//   const {id}=await params
//   const index=todosData.findIndex((todo)=>String(todo.id)===String(id))
//   if(index===-1){
//     return Response.json({error:`Todo with id ${id} not found`},{status:404})
//   }
//   const deletedTodo=todosData.splice(index,1)[0]
//   await writeFile("todos.json",JSON.stringify(todosData,null,2))
//  return Response.json(deletedTodo, { status: 200 })
  await connectDB();

  const { id } = await params;

  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    return Response.json(
      { error: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  return Response.json(
    {
      id: deletedTodo._id.toString(),
      text: deletedTodo.text,
      completed: deletedTodo.completed,
    },
    { status: 200 }
  );
}