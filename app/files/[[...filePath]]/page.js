export default function Page({ params }) {
  const { filePath } = params;

  return (
    <div>
      File {filePath && filePath.length > 0 ? filePath.join('/') : 'root'}
    </div>
  );
}
