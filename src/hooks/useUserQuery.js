import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/service";

export const useUserQuery = (id, isToken) => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(id, isToken),
    });
};
