import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";            // 공통 미션: 로그 출력 미들웨어
import cookieParser from "cookie-parser"; // 공통 미션: 쿠키 파싱 미들웨어
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// ⭐️ [해결 핵심]: res 객체를 임시로 any로 변환하여 에러 확장 방식 우회
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAIL", 
      error: { errorCode, message, data },
      success: null,
    });
  };
  next();
});

// 2. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // JSON 본문 파싱
app.use(express.urlencoded({ extended: false })); // URL-encoded 본문 파싱

// 공통 미션 필수 탑재 미들웨어
app.use(morgan("dev")); 
app.use(cookieParser());

// 3. TSOA 라우터 연결
const router = express.Router();
RegisterRoutes(router); 
app.use("/api/v1", router);

/**
 * ⭐️ 워크북 스펙: 전역 오류 처리 미들웨어
 */
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  // ⭐️ [해결 핵심]: res.status() 뒤에 (res as any) 처리를 하여 error 메서드를 안전하게 호출
  return (res.status(err.statusCode || 500) as any).error({
    errorCode: err.errorCode || "unknown",
    message: err.message || null,
    data: err.data || null,
  });
});

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});