export interface IResponseDto<T> {
    status?: number,
    message?: string,
    data?: T
}