"use client";
import React, { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <>
    <h1>Posts</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
  {posts.map(({ id, title, body }) => (
    <div
      key={id}
      className="bg-blue-400 text-white p-5 rounded-xl shadow hover:shadow-xl transition"
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{body}</p>
    </div>
  ))}
</div>

    </>
);
};

export default Posts;
