export interface ApiResponse<T> {
    resultType: "SUCCESS";
    error: null;
    data: T;
}
export declare const success: <T>(data: T) => ApiResponse<T>;
//# sourceMappingURL=response.d.ts.map