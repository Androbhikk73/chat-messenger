import { Router } from "express";
import { userLogin, userRegister } from "../controllers/UserController";

export default (router: Router) => {
	router.post("/user/register", userRegister);
	router.post("/user/login", userLogin);
};
