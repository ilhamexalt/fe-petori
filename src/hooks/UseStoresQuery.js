import { useQuery } from "@tanstack/react-query";
import { getStoresByUserId } from "../services/service";

export const useStoresQuery = (isToken, userId, page, pageSize) => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: () => getStoresByUserId(isToken, userId, page, pageSize),
    // refetchOnWindowFocus: false,
  });

};


