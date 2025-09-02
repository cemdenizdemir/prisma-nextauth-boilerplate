// import AuthButton from "@/components/authButtons";
import { AuthForm } from "@/components/authenticationForm";

export default async function Login() {
  return (
    <div>
      <div>Login into account</div>
      <AuthForm type="login" />

      {/* <AuthButton /> */}
    </div>
  );
}
