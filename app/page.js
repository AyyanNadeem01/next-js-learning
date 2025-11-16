import Link from 'next/link'
import ComponentPage from './_components/ComponentPage'

export default function Home() {
  return (
  <>
  <h1>Hello world"!</h1>
  <ComponentPage/>
  <Link href="/about">About</Link><br/>{/*do csr*/}
  <Link href="/services">Services</Link>
  <Link href="/blogs">blogs</Link>
  </>);
}
