import http from "http";
import express from "express";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const { server_port, mongo_user, mongo_pwd, mongo_db, mongo_uri } = process.env;

const app = express();
app.use(compression());
app.use(
	cors({
		allowedHeaders: ["*"],
		credentials: true,
	})
);
app.use(express.json());

// Route
app.use("/api", routes());

// Creating server
const server = http.createServer(app);

// MongoDB connection
mongoose.Promise = Promise;
const mongo_url = mongo_uri?.replace("USER", mongo_user!).replace("PWD", mongo_pwd!).replace("DB", mongo_db!);
mongoose
	.connect(mongo_url!, {
		dbName: "chatDB",
	})
	.then(() => server.listen(server_port!, () => console.log(`server running on http://localhost:${server_port}`)))
	.catch((e) => console.error("mongo error: ", e));
