"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthInput from "../components/AuthInput";
import { BiLock, BiUser } from "react-icons/bi";
import { HiAtSymbol } from "react-icons/hi";
import AuthLayout from "../layout/AuthLayout";
import { useSignUpUser } from "@/features/auth/sign-up-user";
import { toast } from "react-toastify";
import SignInWithGoogle from "../components/SignInWithGoogle";
import { useRouter } from "next-nprogress-bar";

// Zod schema for validation
const signUpSchema = z.object({
  firstName: z
    .string()
    .min(3, "First Name must be at least 3 characters long")
    .nonempty("First Name is required"),
  lastName: z
    .string()
    .min(3, "Last Name must be at least 3 characters long")
    .nonempty("Last Name is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
});

// Infer TypeScript types from Zod schema
type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const signUpUser = useSignUpUser();
  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormData) => {
    const id = toast.loading("Registering user...");
    try {
      const response = await signUpUser.mutateAsync(values);

      if (response.success) {
        reset();
        toast.success("User signed up successfully");
        router.push("/auth/sign-in");
      } else {
        toast.error(response.message || "Sign-up failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }

      console.error("Error details:", error);
    } finally {
      toast.done(id);
    }
  };

  return (
    <AuthLayout
      title="Sign Up"
      description="Create an account to continue shopping"
    >
      <>
        <form
          className="max-w-96 w-full mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AuthInput
            type="text"
            label="First Name*"
            index={0}
            icon={<BiUser />}
            {...formRegister("firstName")}
          />
          {errors.firstName && (
            <div className="text-red-600 font-semibold text-sm mt-2">
              {errors.firstName.message}
            </div>
          )}

          <AuthInput
            type="text"
            label="Last Name*"
            index={1}
            icon={<BiUser />}
            {...formRegister("lastName")}
          />
          {errors.lastName && (
            <div className="text-red-600 font-semibold text-sm mt-2">
              {errors.lastName.message}
            </div>
          )}

          <AuthInput
            type="email"
            label="Email*"
            index={2}
            icon={<HiAtSymbol />}
            {...formRegister("email")}
          />
          {errors.email && (
            <div className="text-red-600 font-semibold text-sm mt-2">
              {errors.email.message}
            </div>
          )}

          <AuthInput
            type="password"
            label="Password*"
            index={3}
            icon={<BiLock />}
            {...formRegister("password")}
          />
          {errors.password && (
            <div className="text-red-600 font-semibold text-sm mt-2">
              {errors.password.message}
            </div>
          )}

          <div className="flex justify-center items-center mt-8">
            <button
              type="submit"
              className="bg-primary text-white hover:bg-black w-full h-11  rounded-md text-sm  flex justify-center items-center gap-x-3"
              disabled={isSubmitting || signUpUser.isPending}
            >
              {isSubmitting || signUpUser.isPending ? (
                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          <SignInWithGoogle disabled={isSubmitting || signUpUser.isPending} />
        </form>

        <p className="mt-8 text-xs text-gray-700">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-semibold capitalize ml-3 text-sky-600"
          >
            Sign in
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};

export default SignUp;
