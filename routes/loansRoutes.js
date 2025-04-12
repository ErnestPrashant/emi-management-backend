import {Router} from "express"
import { applyLoan,getLoans } from "../controllers/loansController.js";

const router = Router();

//Apply for a loan
router.post('/apply', applyLoan);

//Get loans for a user
router.get('/:userId', getLoans)

export default router;