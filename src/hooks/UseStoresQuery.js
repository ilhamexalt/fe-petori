import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useStoresQuery = (count) => {
  return useQuery({
    queryKey: ["store"],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products?limit=${count}`).then((res) => res.json()),

  });

};

