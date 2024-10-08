import { useMutation } from "@tanstack/react-query"
import { createUser } from "./user"
import { CreateUserBody } from "./types"
import { useCheckIfUserExistInDb } from "./queries";

export const useCreateUser = (userId: string) => {
    const { data: response } = useCheckIfUserExistInDb(userId);
    const doesUserExist = response;

        return useMutation({
            mutationFn: async (createUserBody: CreateUserBody) => {
                if(!doesUserExist){
                   return await createUser(createUserBody)
                }
            },
        })
}