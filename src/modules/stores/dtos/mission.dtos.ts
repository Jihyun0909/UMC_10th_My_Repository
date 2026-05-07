export interface CreateMissionRequestDto {
  reward: number;
  deadline: string; // "2026-05-10 23:59:59" 형식
  content: string;  // ERD/스키마의 content와 매칭
}