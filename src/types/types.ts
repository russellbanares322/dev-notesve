export type ApiResponse<T> = {
    data: T,
    statusCode: number,
    success: boolean,
    errorMessage: string | null,
    successMessage: string
}