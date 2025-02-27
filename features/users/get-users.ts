
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono/hono";

export const useGetUsers = () => {
  return useQuery({
       queryKey: ["users"],
    queryFn: async () => {
      const response = await client.api.users.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const {data} = await response.json();
      return data;
    },
  });
};
