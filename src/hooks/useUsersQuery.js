import { useQuery } from "@tanstack/react-query";

export const useUsersQuery = () => {
    const count = 5;
    return useQuery({
        queryKey: ["user"],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/users`).then((res) => res.json()),
        // fetch(`https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`).then((res) => res.json()),
    });
};
