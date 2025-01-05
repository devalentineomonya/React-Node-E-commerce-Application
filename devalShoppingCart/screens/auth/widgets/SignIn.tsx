"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthInput from "../components/AuthInput";
import { BiLock } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import signInImage from "@/public/images/signInImage.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import AuthLayout from "../layout/AuthLayout";
// Zod schema for validation
const signInSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
  remember: z.boolean().optional(),
});

// Infer TypeScript types from Zod schema
type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: SignInFormData) => {
    console.log(values);
  };

  return (
    <AuthLayout image={signInImage} title="Sign In" description="Enter your credentials to sign in">
      <>
        <form className="max-w-96 w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            type="email"
            label="Email*"
            index={0}
            icon={<HiAtSymbol />}
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-600 font-semibold text-sm mt-2">{errors.email.message}</div>
          )}

          <AuthInput
            type="password"
            label="Password*"
            index={1}
            icon={<BiLock />}
            {...register("password")}
          />
          {errors.password && (
            <div className="text-red-600 font-semibold text-sm mt-2">{errors.password.message}</div>
          )}

          <div className="flex justify-between text-sm mt-2">
            <div className="flex gap-x-2 justify-center items-center text-gray-500">
              <input type="checkbox" {...register("remember")} id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link className="text-sky-600 font-semibold text-xs" href="/auth/forget-password">Recover Password</Link>
          </div>
          <div className=" flex justify-center items-center mt-8">
            <button
              type="submit"
              className="bg-primary text-white hover:bg-black w-full h-11  rounded-md text-sm  flex justify-center items-center gap-x-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <div className=" flex justify-center items-center w-full mt-4"></div>
        <p className="mt-8 text-xs text-gray-700">
          Don&apos;t have an account?
          <Link
            href="/auth/sign-up"
            className="font-semibold capitalize ml-3 text-sky-600"
          >
            Sign Up
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};

export default SignIn;
