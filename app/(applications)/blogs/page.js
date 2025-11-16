import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Blogs",
};

const page = () => {
  return (
    <div>
      <h1>Blogs</h1>
      <Link href="/blogs/1">Blog 1</Link><br />
      <Link href="/blogs/2">Blog 2</Link><br />
      <Link href="/blogs/3">Blog 3</Link><br />
    </div>
  );
};

export default page;
