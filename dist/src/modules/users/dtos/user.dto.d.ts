export interface UserSignUpRequest {
    email: string;
    name: string;
    gender: string;
    birth: string;
    address?: string;
    detailAddress?: string;
    phoneNumber: string;
    preferences: number[];
}
export interface UserSignUpResponse {
    email: string;
    name: string;
    preferCategory: string[];
}
export declare const bodyToUser: (body: UserSignUpRequest) => {
    email: string;
    name: string;
    gender: string;
    birth: Date;
    address: string;
    detailAddress: string;
    phoneNumber: string;
    preferences: number[];
};
export declare const responseFromUser: (data: {
    user: any;
    preferences: any[];
}) => UserSignUpResponse;
//# sourceMappingURL=user.dto.d.ts.map