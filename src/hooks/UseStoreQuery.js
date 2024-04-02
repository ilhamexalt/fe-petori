import { useQuery } from "@tanstack/react-query";
import { getStore } from "../services/service";

export const useStoreQuery = (isToken, id) => {
  return useQuery({
    queryKey: ["store"],
    queryFn: () => getStore(isToken, id),
    // refetchOnWindowFocus: false, refetchOnMount: false
  });
};


