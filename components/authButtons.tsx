"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="border-2 border-slate-500 w-fit [&>*>*:hover]:cursor-pointer [&>*>*]:border-2 [&>*>*]:p-2 [&>*>*]:w-30 [&>*]:p-2">
        <div>Signed in as {session.user?.email}</div>
        <div>
          <button onClick={() => signOut()}>Çıkış Yap</button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-slate-500 [&>*>*:hover]:cursor-pointer [&>*>*]:border-2 [&>*>*]:p-2 [&>*>*]:w-30 [&>*]:p-2">
      <div>
        <button onClick={() => signIn("Google")}>Bilgiler ile Giriş Yap</button>
      </div>
      <div>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/", // or "/dashboard"
            })
          }
        >
          Google ile Giriş Yap
        </button>
      </div>
    </div>
  );
}
