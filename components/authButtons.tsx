"use client";

import { useSession, signIn, signOut } from "next-auth/react";
// import { AuthForm } from "@/components/authenticationForm";

export default function AuthStatus() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="border-2 border-slate-500  [&>*>*:hover]:cursor-pointer [&>*>*]:border-2 [&>*>*]:p-2 [&>*>*]:w-30 [&>*]:p-2">
        <div>Signed in as {session.user?.email}</div>
        <div>
          <button className="hover:bg-slate-200" onClick={() => signOut()}>
            Çıkış Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    // <LoginForm />
    <div className=" border-2 border-slate-500 [&>*>*:hover]:cursor-pointer [&>*>*]:border-2 [&>*>*]:p-2 [&>*>*]:w-30 [&>*]:p-2">
      {/* <div>
        <button onClick={() => signIn("Google")}> Credentials</button>
      </div> */}

      <div>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/", // or "/dashboard"
            })
          }
        >
          Google ile gir
        </button>
      </div>
    </div>
  );
}
