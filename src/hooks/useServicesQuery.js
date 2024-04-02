import { useQuery } from "@tanstack/react-query";
import { getServices } from "../services/service";


export const useServicesQuery = (isToken) => {
    return useQuery({
        queryKey: ["services"],
        queryFn: () => getServices(isToken), refetchOnMount: false,
        // refetchOnWindowFocus: false
    });
};
