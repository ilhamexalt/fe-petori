import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "../services/service";


export const useOrdersQuery = (isToken, userId, page, pageSize) => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => getOrderHistory(isToken, userId, page, pageSize),
    });
};
