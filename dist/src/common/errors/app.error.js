export class AppError extends Error {
    errorCode;
    statusCode;
    data;
    constructor(params) {
        super(params?.message);
        this.errorCode = params?.errorCode ?? "UNKNOWN";
        this.statusCode = params?.statusCode ?? 500;
        this.data = params?.data ?? null;
    }
}
//# sourceMappingURL=app.error.js.map