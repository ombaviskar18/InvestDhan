import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getBusiness, getBusinessById, registerCompany, updateBusiness } from "../controllers/business.controller.js";
import { singleUpload } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany)
router.route("/get").get(isAuthenticated,getBusiness)
router.route("/get/:id").get(isAuthenticated,getBusinessById) 
router.route("/update/:id").put(isAuthenticated,singleUpload ,updateBusiness)
 
export default router;
