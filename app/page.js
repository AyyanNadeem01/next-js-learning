import Link from 'next/link'
export default function Home() {
  return (
  <>
  <h1>Hello world"!</h1>
  <Link href="/about">About</Link><br/>{/*do csr*/}
  <Link href="/services">Services</Link>
  
  </>
  );
}
