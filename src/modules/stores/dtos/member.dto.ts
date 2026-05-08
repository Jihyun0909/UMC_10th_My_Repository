export interface SignUpRequestDto {
  email: string;
  name: string;
  password: string; // 사용자로부터 받을 평문 비밀번호
  gender: 'M' | 'F';
  address: string;
  regionId: number;
  phone_number: number;
}