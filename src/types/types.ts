
export type TPaginationData = {
    totalPages: number,
    pageNumber: number,
    pageSize: number
}

export type ApiResponse<T> = {
    data: T,
    statusCode: number,
    success: boolean,
    errorMessage: string | null,
    successMessage: string
}

export type QueryError = {
    response: {
        data: ApiResponse<null>
    }
}