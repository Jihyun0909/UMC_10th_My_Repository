import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";            // 공통 미션: 로그 출력 미들웨어
import cookieParser from "cookie-parser"; // 공통 미션: 쿠키 파싱 미들웨어
import swaggerUi from "swagger-ui-express"; // Swagger UI 미들웨어
import path from "path";
import fs from "fs";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. TSOA가 생성한 swagger.json 읽어오기 (ESM 환경 동기식 로드)
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

// [해결 핵심]: res 객체를 임시로 any로 변환하여 에러 확장 방식 우회
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

// 3. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // JSON 본문 파싱
app.use(express.urlencoded({ extended: false })); // URL-encoded 본문 파싱

// 공통 미션 필수 탑재 미들웨어
app.use(morgan("dev")); 
app.use(cookieParser());

// Swagger UI 라우터 연결 (http://localhost:3000/docs)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 4. TSOA 라우터 연결 (5, 6, 7주차 API를 컴파일러가 자동 인식해서 한 몸으로 묶어줍니다!)
const router = express.Router();
RegisterRoutes(router); 
app.use("/api/v1", router);

// 기본 웰컴 루트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript TSOA Server!");
});

/**
 * 전역 오류 처리 미들웨어 (🚨 원인 추적용 디버깅 모드로 보정)
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  // 1. 백엔드 실행 터미널(VSCode) 콘솔에 에러의 진짜 본모습과 발생 경로를 빨갛게 찍어버립니다.
  console.error("🚨 [SERVER REAL ERROR]:", err);

  // 2. 스웨거 응답 창에서도 에러 원인을 생생하게 볼 수 있도록 가리지 않고 리턴합니다.
  return res.status(err.statusCode || 500).json({
    resultType: "FAIL",
    error: {
      errorCode: err.errorCode || "unknown",
      message: err.message || "원인 메시지가 없습니다. 터미널 창 로그를 확인하십시오.",
      data: err.stack || null, // 에러 추적 스택 경로를 데이터에 밀어 넣음
    },
    success: null,
  });
});

// 5. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});