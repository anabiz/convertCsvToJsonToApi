import { Router } from "express";
import apiV1Route from "./apiv1";

const router = Router();

/* GET home page. */
router.use("/", apiV1Route);

export default router;
