// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  email: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[];
}

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
  };
};

// 2. 유저 정보와 선호 카테고리 정보를 받아 클라이언트 응답용 객체로 변환하는 함수
export const responseFromUser = (data: { user: any; preferences: any[] }) => {
  return {
    email: data.user.email,
    name: data.user.name,
    gender: data.user.gender,
    birth: data.user.birth,
    address: data.user.address,
    detailAddress: data.user.detailAddress,
    phoneNumber: data.user.phoneNumber,
    preferences: data.preferences, // 선호 카테고리 리스트
  };
};