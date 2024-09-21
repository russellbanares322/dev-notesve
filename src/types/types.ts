
export type TPaginationData = {
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