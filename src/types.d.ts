// src/types.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Response {
      /** 교안 표준 규격 실패 응답 변환 확장 인터셉터 */
      error(params: { errorCode?: string; message: string | null; data?: any }): this;
    }
  }
}