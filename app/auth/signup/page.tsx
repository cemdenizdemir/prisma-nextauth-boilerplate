import { AuthForm } from "@/components/authenticationForm";

export default async function Login() {
  return (
    <div>
      <div>Create new account</div>
      <div>
        <AuthForm type="signup" />
      </div>
    </div>
  );
}
