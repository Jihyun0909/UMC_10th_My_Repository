export declare class AppError extends Error {
    readonly errorCode: string;
    readonly statusCode: number;
    readonly data?: any;
    constructor(params?: {
        errorCode: string;
        message: string;
        statusCode: number;
        data?: any;
    });
}
//# sourceMappingURL=app.error.d.ts.map