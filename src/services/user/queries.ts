import { useQuery } from "@tanstack/react-query"
import { isUserExistInDb } from "./user"

export const useCheckIfUserExistInDb = (user_id: string | undefined) => {
    return useQuery({
        queryFn: () => isUserExistInDb(user_id),
        queryKey: ["User"],
        enabled: user_id !== undefined
    })
}