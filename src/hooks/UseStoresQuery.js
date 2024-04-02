import { useQuery } from "@tanstack/react-query";
import { getStoresByUserId } from "../services/service";

export const useStoresQuery = (isToken, userId) => {
  return useQuery({
    queryKey: ["store"],
    queryFn: () => getStoresByUserId(isToken, userId),
    refetchOnWindowFocus: false,
  });

};


