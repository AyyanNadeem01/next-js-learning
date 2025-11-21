import todosData from "../../../todos";

export async function GET(_,{params}) {
  const {id}=await params
  const todo=await todosData.find((todo)=>todo.id===parseInt(id))
  console.log(todo)
  if(!todo){
    return Response.json({error:"Todo not found"},{status:404})
  }
  return Response.json(todo);

}