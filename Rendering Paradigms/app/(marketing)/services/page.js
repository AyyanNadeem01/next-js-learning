import { cookies } from "next/headers"
import Link from "next/link"
//export const dynamic="force-dynamic"//this will make this page dynamic rendering always
//export const dynamic="force-static"//this will make this page static rendering always , even if we use searchParams or cookies etc
//export const dynamic="error"//this will throw error if we try to make this page dynamic by using searchParams or cookies etc

export const metadata={
  title:"Services",
}
const page = async({searchParams}) => {
  const search=await searchParams//this also makes the page dynamic
  console.log(search)//if we comment these two lines then it will be static again even if we destructure searchParams
  
  // const myCookies=await cookies()
  // console.log(myCookies)//this also makes the page dynamic
  //there are other way that can allow dynamic rendering like headers etc
  console.log("Running Services Page")
  return (
    <div>
      All services
      <p><Link href="/services/web-dev">Web Development</Link></p>
      <p><Link href="/services/seo">Seo</Link></p>

    </div>
  )
}

export default page
