import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
import { signUpSchema } from "@/lib/validation/schemas";
import { z } from "zod";
export const useSignUpUser = () => {
  const query = useMutation({
    mutationFn: async (jsonData: z.infer<typeof signUpSchema>) => {
      const response = await client.api.auth["sign-up"].$post({
        json: jsonData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up user");
      }

      return data;
    },
  });
  return query;
};
