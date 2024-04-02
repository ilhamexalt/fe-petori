import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/service";

export const useUsersQuery = (isToken) => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(isToken),
    });
};
