"use client";   // required because Suspense fallback is a Client Component
import React from "react";

const Loading = ({ text }) => {
  return (
    <div className="flex items-center justify-center">
      Loading {text}...
    </div>
  );
};

export default Loading;
