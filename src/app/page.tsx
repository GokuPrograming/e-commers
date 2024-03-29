import { link } from "fs";
import Link from "next/link";
import { blob } from "stream/consumers";
export default function Home() {
  return (<>
    <div>WelcomeHome</div>
    <Link href="/pages/auth/login">logon</Link>
  </>

  )
}
