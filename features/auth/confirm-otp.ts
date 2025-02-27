import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
import { confirmOtpSchema } from "@/lib/validation/schemas";
import { z } from "zod";
export const useConfirmOtp = () => {
  const query = useMutation({
    mutationFn: async (jsonData: z.infer<typeof confirmOtpSchema>) => {
      const response = await client.api.auth["confirm-otp"].$post({
        json: jsonData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to confirm otp code");
      }
      return data;
    },
  });
  return query;
};
