import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/api";

export const useClasees = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await api.get("/classes");
      return response.data.data;
    },
  });
};
