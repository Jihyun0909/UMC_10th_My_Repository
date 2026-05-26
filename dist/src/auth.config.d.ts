import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy } from "passport-jwt";
export declare const generateAccessToken: (user: {
    id: number;
    email: string;
}) => string;
export declare const generateRefreshToken: (user: {
    id: number;
}) => string;
export declare const googleStrategy: GoogleStrategy;
export declare const jwtStrategy: JwtStrategy;
export declare const isLogin: (req: any, res: any, next: any) => void;
//# sourceMappingURL=auth.config.d.ts.map