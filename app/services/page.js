import Link from "next/link"
export const metadata={
  title:"Services",
}
const page = () => {
  return (
    <div>
      All services
      <p><Link href="/services/web-dev">Web Development</Link></p>
      <p><Link href="/services/seo">Seo</Link></p>

    </div>
  )
}

export default page
