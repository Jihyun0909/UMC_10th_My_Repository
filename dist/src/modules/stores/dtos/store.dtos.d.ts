export interface CreateStoreRequestDto {
    name: string;
    address: string;
    categoryId: number;
}
export interface ReviewItem {
    id: number;
    body: string;
    score: number;
    user: {
        name: string;
    };
}
export interface ReviewListResponse {
    data: ReviewItem[];
    pagination: {
        cursor: number | null;
    };
}
export declare const responseFromReviews: (reviews: any[]) => {
    data: any[];
    pagination: {
        cursor: any;
    };
};
export type StoreRequestDto = CreateStoreRequestDto;
export type StoreResponseDto = {
    storeId: number;
    name: string;
    address: string;
    categoryId: number;
};
//# sourceMappingURL=store.dtos.d.ts.map