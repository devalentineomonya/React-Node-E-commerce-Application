import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
export const useResendOtp = () => {
  const query = useMutation({
    mutationFn: async () => {
      const response = await client.api.auth["resend-otp"].$post();
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to resend otp code");
      }
      return data;
    },
  });
  return query;
};
