//client side import
// import { useSession, signIn, signOut } from "next-auth/react";

//server side import
//import checkServerSession from "@/lib/checkServerSession";

import AuthButton from "@/components/authButtons";

export default async function Home() {
  //client side kullanım
  // const { data: session } = useSession();

  //server side kullanım
  // const session = await checkServerSession();

  return (
    <div>
      {/* <div>kullanıcı session = {JSON.stringify(session)}</div> */}
      <div>
        <AuthButton />
      </div>
    </div>
  );
}
