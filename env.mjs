import {createEnv} from "@t3-oss/env-nextjs"
import {z} from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
  },
  client: {
    NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS: z.string().transform(value => parseInt(value, 10)),
    NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS: z.string().transform(value => parseInt(value, 10)),
    NEXT_PUBLIC_API_BASE_URL: z.string(),
    NEXT_PUBLIC_MAX_RETRY_COUNT: z.string().transform(value => parseInt(value, 10)),
    NEXT_PUBLIC_TIMEOUT: z.string().transform(value => parseInt(value, 10)),
    NEXT_PUBLIC_RETRY_TTL: z.string().transform(value => parseInt(value, 10)),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY_DAYS,
    NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS: process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY_DAYS,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_MAX_RETRY_COUNT: process.env.NEXT_PUBLIC_MAX_RETRY_COUNT,
    NEXT_PUBLIC_TIMEOUT: process.env.NEXT_PUBLIC_TIMEOUT,
    NEXT_PUBLIC_RETRY_TTL: process.env.NEXT_PUBLIC_RETRY_TTL,
  },
})
