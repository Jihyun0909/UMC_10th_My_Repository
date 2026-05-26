import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";            // 공통 미션: 로그 출력 미들웨어
import cookieParser from "cookie-parser"; // 공통 미션: 쿠키 파싱 미들웨어
import swaggerUi from "swagger-ui-express"; // Swagger UI 미들웨어
import path from "path";
import fs from "fs";
import passport from "passport"; // 9주차: 패스포트 미들웨어 추가
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";
// auth.config.ts에서 완성된 두 전략과 검증 미들웨어를 가져옵니다.
import { googleStrategy, jwtStrategy, isLogin } from "./auth.config.js"; 

// 1. 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. Passport 라이브러리에 구글 로그인 및 JWT 검증 전략 등록
passport.use(googleStrategy);
passport.use(jwtStrategy); 
app.use(passport.initialize());

// 3. TSOA가 생성한 swagger.json 읽어오기 (ESM 환경 동기식 로드)
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);

// res 객체를 임시로 any로 변환하여 에러 확장 방식 우회
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

// 4. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // JSON 본문 파싱
app.use(express.urlencoded({ extended: false })); // URL-encoded 본문 파싱

// 공통 미션 필수 탑재 미들웨어
app.use(morgan("dev")); 
app.use(cookieParser());

// 5. 구글 OAuth 일반 Express 라우트 배치
app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));

app.get("/oauth2/callback/google", 
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req: Request, res: Response) => {
    // 인증에 성공하면 passport-google-oauth20 전략에서 cb(null, tokens)로 넘겨준 데이터가 req.user에 안착합니다.
    res.status(200).json({ success: true, tokens: req.user });
  }
);

// 구글 인증 실패 시 리다이렉트될 예외 페이지 라우트
app.get("/login-failed", (req: Request, res: Response) => {
  return (res as any).error({
    errorCode: "AUTH001",
    message: "구글 소셜 로그인 인증에 실패했습니다.",
  });
});

// 헤더에 Authorization: Bearer <토큰>을 보내면 isLogin이 유효성을 검사하고 정보를 넘겨줍니다.
app.get("/mypage", isLogin, (req: Request, res: Response) => {
  res.status(200).json({
    resultType: "SUCCESS",
    error: null,
    success: {
      message: `인증 성공! ${(req.user as any).name}님의 마이페이지입니다.`,
      user: req.user,
    },
  });
});

/* ==========================================
 * 🍒 [공통 미션 1]: 기존 API 보호 및 하드코딩 제거 라우트 구현
 * ========================================== */

/**
 * 리뷰 작성 API (isLogin 인증 적용)
 * 기존의 고정된 유저 ID 하드코딩을 탈피하고 토큰에서 추출한 동적 ID를 매핑합니다.
 */
app.post("/api/v1/reviews", isLogin, (req: Request, res: Response) => {
  // 토큰 검증 미들웨어를 통과했으므로 req.user에서 안전하게 고유 식별자를 꺼냅니다.
  const loginUserId = (req.user as any).id;

  // 비즈니스 데이터 처리는 유저님의 서비스단 함수(예: reviewService.create)로 위임하여 처리하시면 됩니다.
  res.status(200).json({
    resultType: "SUCCESS",
    error: null,
    success: {
      message: "인증된 사용자의 리뷰 생성이 요청되었습니다.",
      authenticatedUserId: loginUserId, // 하드코딩 탈출 검증용
      receivedBody: req.body
    }
  });
});

/**
 * 가게 추가 API (isLogin 인증 적용)
 */
app.post("/api/v1/stores", isLogin, (req: Request, res: Response) => {
  const loginUserId = (req.user as any).id;

  res.status(200).json({
    resultType: "SUCCESS",
    error: null,
    success: {
      message: "인증된 사용자의 신규 가게 등록이 요청되었습니다.",
      authenticatedUserId: loginUserId,
      receivedBody: req.body
    }
  });
});

// ==========================================

// Swagger UI 라우터 연결 (http://localhost:3000/docs)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 6. TSOA 라우터 연결
const router = express.Router();
RegisterRoutes(router); 
app.use("/api/v1", router);

// 기본 웰컴 루트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript TSOA Server!");
});

/**
 * 전역 오류 처리 미들웨어
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("🚨 [SERVER REAL ERROR]:", err);

  return res.status(err.statusCode || 500).json({
    resultType: "FAIL",
    error: {
      errorCode: err.errorCode || "unknown",
      message: err.message || "원인 메시지가 없습니다. 터미널 창 로그를 확인하십시오.",
      data: err.stack || null,
    },
    success: null,
  });
});

// 7. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});