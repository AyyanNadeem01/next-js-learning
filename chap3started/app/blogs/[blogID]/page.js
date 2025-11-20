import "./blogID.css"
//import "./hi.css"
const Blog = async ({ params }) => {
  const { blogID } = await params;

  // if (blogID % 2 === 0) {
  //   throw new Error("BlogId can only be an odd number");
  // }

  // const randomNumber = Math.random();
  // console.log(randomNumber);
  
  // if (randomNumber > 0.5) {
  //   throw new Error("Error occurred");//this is error which occur sometime, sometime not
  // }

  return (
    <>
      <div>
        <h1 className="blogId">Welcome to Our Blog {blogID}</h1>
        <p className="title">This is blog {blogID} page.</p>
      </div>
    </>
  );
};

export default Blog;