import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/service";

export const useUsersQuery = (isToken, page, pageSize) => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(isToken, page, pageSize),
        refetchOnWindowFocus: false,
    });
};
