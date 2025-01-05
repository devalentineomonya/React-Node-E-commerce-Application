"use client"
import newPasswordImage from "@/public/images/resetPassword.png";
import AuthInput from "../components/AuthInput";
import { HiAtSymbol } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthLayout from "../layout/AuthLayout";

// Zod schema for form validation
const NewPasswordSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("New password is required"),
  confirmPassword: z
    .string()
    .nonempty("Please confirm your new password")
    .refine((val, ctx) => val === ctx.parent.newPassword, {
      message: "Passwords must match",
    }),
});

// Infer the TypeScript type from the Zod schema
type NewPasswordFormData = z.infer<typeof NewPasswordSchema>;

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(NewPasswordSchema),
  });

  // Handle form submission
  const onSubmit = async (data: NewPasswordFormData) => {
    console.log(data);
  };

  return (
    <AuthLayout
      image={newPasswordImage}
      title="New Password"
      description="Enter your email and new password"
    >
      <form className="max-w-96 w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          type="email"
          label="Email*"
          icon={<HiAtSymbol />}
          {...register("email")}
        />
        {errors.email && (
          <div className="text-red-600 font-semibold text-sm mt-2">
            {errors.email.message}
          </div>
        )}

        <AuthInput
          type="password"
          label="New Password*"
          icon={<BiLock />}
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <div className="text-red-600 font-semibold text-sm mt-2">
            {errors.newPassword.message}
          </div>
        )}

        <AuthInput
          type="password"
          label="Confirm Password*"
          icon={<BiLock />}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <div className="text-red-600 font-semibold text-sm mt-2">
            {errors.confirmPassword.message}
          </div>
        )}

        <div className="flex justify-center items-c mt-8">
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

export default NewPassword;
