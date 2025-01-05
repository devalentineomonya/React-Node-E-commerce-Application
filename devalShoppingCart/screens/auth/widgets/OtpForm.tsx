"use client"
import React from "react";
import AuthLayout from "../layout/AuthLayout";
import OtpInput from "../components/OtpInput";
import accountVerify from "@/public/images/accountVerify.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

type OtpFormData = z.infer<typeof otpSchema>;

const OtpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onOtpSubmit = async (data: OtpFormData) => {
    console.log(data);
  };

  return (
    <AuthLayout
      image={accountVerify}
      title="Verify Account"
      description="Enter the OTP sent to your email"
    >
      <form className="max-w-96 w-full mt-4" onSubmit={handleSubmit(onOtpSubmit)} >
        <OtpInput {...register("otp")} length={6} />
        {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
        <div className="flex justify-between text-sm mt-5">
          <button className="flex">
            {true ? (
              <div className="h-5 w-5 rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></div>
            ) : (
              "Resend Code"
            )}
          </button>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="bg-primary text-white hover:bg-black w-full h-11  rounded-md text-sm  flex justify-center items-center gap-x-3"
          >
            {false ? (
              <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default OtpForm;
