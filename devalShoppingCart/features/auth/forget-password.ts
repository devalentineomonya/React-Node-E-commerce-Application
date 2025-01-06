import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
import { forgotPasswordSchema } from "@/lib/validation/schemas";
import { z } from "zod";
export const useForgetPassword = () => {
  const query = useMutation({
    mutationFn: async (jsonData:z.infer<typeof forgotPasswordSchema>) => {
      const response = await client.api.auth["forget-password"].$post({
        json:jsonData
      });
      if (!response.ok) {
        throw new Error("Failed to sent reset link");
      }
      const data = await response.json();
      return data;
    },
  });
  return query;
};
