export interface CreateStoreRequestDto {
  name: string;
  address: string;
  categoryId: number; // ERD의 category_id와 매칭
}