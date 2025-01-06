import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
import { newPasswordSchema } from "@/lib/validation/schemas";
import { z } from "zod";
export const useNewPassword = () => {
  const query = useMutation({
    mutationFn: async (jsonData: z.infer<typeof newPasswordSchema>) => {
      const response = await client.api.auth["new-password"].$put({
        json: jsonData,
      });
      if (!response.ok) {
        throw new Error("Failed to update password");
      }
      const data = await response.json();
      return data;
    },
  });
  return query;
};
