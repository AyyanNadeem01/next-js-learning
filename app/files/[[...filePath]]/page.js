export default async function Page({ params }) {
  const { filePath } = await params;

  return (
    <div>
      File {filePath && filePath.length > 0 ? filePath.join('/') : 'root'}
    </div>
  );
}
