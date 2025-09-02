"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSession, signIn, signOut } from "next-auth/react";

import { loginSchema, signupSchema } from "@/types/authentication";
// import type { LoginSchemaType, SignupSchemaType } from "@/types/authentication";

import { signupAction } from "@/app/actions/auth";

// const formSchema = z.object({
//   email: z.email().min(1, {
//     message: "Enter email.",
//   }),
//   password: z.string().min(1, {
//     message: "Enter email.",
//   }),
// });

export function AuthForm({
  className,
  type = "login",
  ...props
}: React.ComponentProps<"div"> & { type?: "login" | "signup" }) {
  const formSchema = type == "login" ? loginSchema : signupSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.keys(formSchema.shape).reduce((acc, key) => {
      acc[key as keyof z.infer<typeof formSchema>] = "";
      return acc;
    }, {} as Record<string, string>),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (type === "signup") {
      const res = await signupAction(values as z.infer<typeof signupSchema>);
      alert(res);
    } else {
      console.log("Login:", values);
    }
  }

  const renderField = (name: keyof z.infer<typeof formSchema>) => (
    <FormField
      key={name}
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Input
              type={
                name.toLowerCase().includes("password") ? "password" : "text"
              }
              placeholder={name}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {/* <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="s7r0ng_p4ssw0rd"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div> */}
                {Object.keys(formSchema.shape).map((name) =>
                  renderField(name as keyof z.infer<typeof formSchema>)
                )}
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    {type == "login" ? "Login" : "Signup"}
                  </Button>
                  {type == "login" ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        signIn("google", {
                          callbackUrl: "/", // or "/dashboard"
                        })
                      }
                    >
                      Login with Google
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                {type === "login" ? (
                  <>
                    <span>Don&apos;t have an account? </span>
                    <a
                      href="/auth/signup"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </a>
                  </>
                ) : (
                  <>
                    <span>Do you have an account? </span>
                    <a
                      href="/auth/login"
                      className="underline underline-offset-4"
                    >
                      Login
                    </a>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
