import { useMutation } from "@tanstack/react-query"
import { createUser } from "./user"
import { CreateUserBody } from "./types"

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (createUserBody: CreateUserBody) => createUser(createUserBody),
    })
}