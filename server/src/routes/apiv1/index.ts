import { Router } from "express";
import ReportRoutes from "../apiv1/report";

const router = Router();

/* GET home page. */
router.use("/report", ReportRoutes);


export default router;
