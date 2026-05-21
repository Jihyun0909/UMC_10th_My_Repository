import { AppError } from "./app.error.js"; // 💡 nodenext 문법 반영 (.js 필수)

export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001", // 워크북 에러 분기용 가이드 코드
      statusCode: 409,  // Conflict 상태 코드
      message,
      data,
    });
  }
}