import { Router } from "express";
import userRoute from "./userRoute";

const routes = Router();

export default (): Router => {
	userRoute(routes);

	return routes;
};
