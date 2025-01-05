"use client"
import resetPassword from "@/public/images/resetPassword.png";
import AuthInput from "../components/AuthInput";
import { HiAtSymbol } from "react-icons/hi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AuthLayout from "../layout/AuthLayout";
// Define Zod schema
const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
});

// Infer form data type from Zod schema
type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

const ForgetPassword = () => {
  // Use react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  // Handle form submission
  const onSubmit = async (data: ForgetPasswordFormData) => {
    console.log(data);
  };

  return (
    <AuthLayout
      image={resetPassword}
      title="Reset Password"
      description="Enter your email to reset your password"
    >
      <form className="max-w-96 w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          type="email"
          label="Email*"
          icon={<HiAtSymbol />}
          {...register("email")}
        />
        {errors.email && (
          <div className="text-red-600 font-semibold text-sm mt-2">{errors.email.message}</div>
        )}

        <div className=" flex justify-center items-center mt-8">
          <button
            type="submit"
            className="bg-primary text-white hover:bg-black w-full h-11  rounded-md text-sm  flex justify-center items-center gap-x-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgetPassword;
