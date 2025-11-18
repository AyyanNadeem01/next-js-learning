const Todos = async () => {
  //the under code is server code and dont went to client side
  const slowResponse=await fetch("https://procodrr.vercel.app/?sleep=2000")  
  const data=await slowResponse.json();
  console.log(data)
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",{
        next:{revalidate:10,},
    }
  );
  const todos = await response.json();
//fetching is occuring at server side not on client side and html is comming from server
//this is next fetch not normal fetch api which is used to fetch data from server side and have extra features like caching,revalidation etc  
return (
    <>
      <h1>Todos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {todos.map(({ id, title, completed }) => (
          <div
            key={id}
            className="bg-blue-400 text-white p-5 rounded-xl shadow hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold mb-2">{title}</h2>

            <p className="text-white font-medium">
              {completed ? "✓ Completed" : "⨯ Not Completed"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;
