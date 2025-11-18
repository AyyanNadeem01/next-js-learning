// app/todos/parallelFetching/page.jsx

const fetchJSON = async (url) => {
  const res = await fetch(url, { next: { revalidate: 10 } });
  return res.json();
};

const ParallelFetching = async () => {
  // List of URLs to fetch
  const urls = [
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
    "https://procodrr.vercel.app/?sleep=1000",
    "https://procodrr.vercel.app/?sleep=3000",
    "https://procodrr.vercel.app/?sleep=5000",
  ];

  // Map each URL to a fetchJSON call
  const [todos, slow1, slow2, slow3] = await Promise.all(urls.map(fetchJSON));

  return (
    <div className="p-6 space-y-12">
      {/* TODOS SECTION */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Todos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {todos.map(({ id, title, completed }) => (
            <div key={id} className="bg-blue-400 text-white p-5 rounded-xl shadow hover:shadow-xl transition">
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
              <p className="font-medium">{completed ? "✓ Completed" : "⨯ Not Completed"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SLOW API RESULTS */}
      <div className="space-y-4">
        <div className="flex justify-center items-center">Slow 1 Result: {JSON.stringify(slow1)}</div>
        <div className="flex justify-center items-center">Slow 2 Result: {JSON.stringify(slow2)}</div>
        <div className="flex justify-center items-center">Slow 3 Result: {JSON.stringify(slow3)}</div>
      </div>
    </div>
  );
};

export default ParallelFetching;
