import {Router} from "express"
import { applyLoan,getLoans } from "../controllers/loansController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

//Apply for a loan
router.post('/apply', authMiddleware, applyLoan);

//Get loans for a user
router.get('/get', authMiddleware, getLoans)

export default router;