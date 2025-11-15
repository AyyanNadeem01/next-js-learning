export default async function Page({ params }) {
  const { blog,comment } = await params;

  return (
    <div>
      Blog  {blog} ,
      comment: {comment}
    </div>
  );
}
