import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.string().default("development"),
	MONGODB_URI: z.string().default(""),
	JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
	JWT_EXPIRES_IN: z.string().default("1h"),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
	throw new Error(result.error.issues.map((issue) => issue.message).join(", "));
}

export const env = {
	port: result.data.PORT,
	nodeEnv: result.data.NODE_ENV,
	mongoURI: result.data.MONGODB_URI,
	jwtSecret: result.data.JWT_SECRET,
	jwtExpiresIn: result.data.JWT_EXPIRES_IN,
};
