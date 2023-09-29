import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

const { app_secret_key } = process.env;

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) =>
	crypto.createHmac("sha256", [salt, password].join("#")).update(app_secret_key!).digest("hex");
