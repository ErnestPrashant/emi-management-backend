import {Router} from "express"
import {makePayment, getPayments} from '../controllers/paymentsController.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/pay', authMiddleware, makePayment);

router.get('/:loanId', authMiddleware, getPayments)

export default router