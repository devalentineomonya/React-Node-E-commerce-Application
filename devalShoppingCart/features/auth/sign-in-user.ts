import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono/hono";
import { signInSchema } from "@/lib/validation/schemas";
import { z } from "zod";
export const useSigninUser = () => {
  const query = useMutation({
    mutationFn: async (jsonData: z.infer<typeof signInSchema>) => {
      const response = await client.api.auth["sign-in"].$post({
        json: jsonData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign user in");
      }
      return data;
    },
  });
  return query;
};
