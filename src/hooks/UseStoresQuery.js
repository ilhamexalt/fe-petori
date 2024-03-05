import { useQuery } from "@tanstack/react-query";

export const useStoresQuery = () => {
  return useQuery({
    queryKey: ["store"],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products`).then((res) => res.json()),
  });
};
