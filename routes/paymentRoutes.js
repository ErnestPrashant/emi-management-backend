import {Router} from "express"
import {makePayment, getPayments} from '../controllers/paymentsController.js'

const router = Router();

router.post('/pay', makePayment);

router.get('/:loanId', getPayments)

export default router