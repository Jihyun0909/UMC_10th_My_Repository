import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { prisma } from "./db.config.js"; 

dotenv.config();

// 1. JWT 토큰 생성 함수
export const generateAccessToken = (user: { id: number; email: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user: { id: number }) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "14d" }
  );
};

// 2. Google Verify 로직
const googleVerify = async (profile: Profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error("Google 프로필에 이메일이 없습니다.");

  let user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: profile.displayName || "구글 유저",
        gender: "FEMALE", 
        birth: new Date("2003-09-09"),
        address: "추후 수정",
        detailAddress: "추후 수정",
        phoneNumber: "추후 수정",
      },
    });
  }

  return { id: user.id, email: user.email, name: user.name };
};

// 3. Google Strategy
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET!,
    callbackURL: "/oauth2/callback/google",
    scope: ["email", "profile"],
  },
  async (_accessToken, _refreshToken, profile, cb) => {
    try {
      const user = await googleVerify(profile);
      const tokens = {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      };
      return cb(null, tokens);
    } catch (err) {
      return cb(err as Error);
    }
  }
);

// 4. JWT 검증 전략 (done 콜백 및 삼항 연산자 구조 매핑)
export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer 토큰 추출
    secretOrKey: process.env.JWT_SECRET!,
  },
  async (payload, done) => {
    try {
      // 토큰 안의 id로 유저를 단일 조회합니다.
      const user = await prisma.user.findFirst({ where: { id: payload.id } });
      
      // 유저가 존재하면 user를, 없으면 false를 done 콜백으로 반환합니다.
      return user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
);

// 5. 인증 여부를 검사할 'isLogin' 미들웨어
export const isLogin = (req: any, res: any, next: any) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err || !user) {
      return res.status(401).json({
        resultType: "FAIL",
        error: {
          errorCode: "AUTH002",
          message: "인증되지 않은 요청입니다. 토큰을 확인하십시오.",
        },
        success: null,
      });
    }

    req.user = user; // 유효한 유저 정보를 심고 다음 단계로 패스
    next();
  })(req, res, next);
};