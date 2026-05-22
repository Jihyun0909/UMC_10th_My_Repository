export declare const addUser: (data: any) => Promise<number | null>;
export declare const getUser: (userId: number) => Promise<{
    email: string;
    name: string;
    gender: string;
    birth: Date;
    address: string;
    detailAddress: string | null;
    phoneNumber: string;
    id: number;
}>;
export declare const setPreference: (userId: number, foodCategoryId: number) => Promise<void>;
export declare const getUserPreferencesByUserId: (userId: number) => Promise<({
    foodCategory: {
        name: string;
        id: number;
    };
} & {
    id: number;
    userId: number;
    foodCategoryId: number;
})[]>;
//# sourceMappingURL=user.repository.d.ts.map