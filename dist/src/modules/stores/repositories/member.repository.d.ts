/**
 * 신규 회원(User/Member) 데이터를 데이터베이스에 등록합니다.
 * @param data - 등록할 회원의 입력 정보 객체
 * @returns 생성된 회원의 고유 ID (Number)
 */
export declare const addMember: (data: any) => Promise<number>;
/**
 * 사용자(User/Member) 존재 여부를 식별자로 검증합니다.
 * @param memberId - 검증할 사용자 고유 ID
 * @returns 사용자 존재 여부 (Boolean)
 */
export declare const checkMemberExists: (memberId: number) => Promise<boolean>;
//# sourceMappingURL=member.repository.d.ts.map