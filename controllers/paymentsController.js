import Payment from "../models/payment.js";
import Loan from "../models/loan.js";
import mongoose from "mongoose";

export const makePayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { loanId, amountPaid } = req.body;
    const pay = new Payment({
      loanId: loanId,
      amountPaid: amountPaid,
      datePaid: Date.now(),
    });
    await pay.save({ session });

    //update loan balance
    const loanInfo = await Loan.findOne({ _id: loanId }).session(session);
    if (!loanInfo) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "No such loans exists",
      });
    }
    loanInfo.remainingBalance -= amountPaid;
    loanInfo.remainingBalance.toFixed(2);
    await loanInfo.save({ session });
    const rem = loanInfo.remainingBalance;

    await session.commitTransaction();
    res.status(201).json({ pay, rem });
  } catch (error) {
    await session.abortTransaction();
    res.status(404).json({
      message: `error handling request ${error.message}`,
    });
  } finally {
    session.endSession();
  }
};

//get payments for a loan
export const getPayments = async (req, res) => {
  const { loanId } = req.params;
  let payData;
  try {
    if (loanId == "all") {
      payData = await Payment.find().sort({datePaid:-1});
    } else {
      payData = await Payment.find({ loanId }).sort({datePaid:-1});
    }
    if (payData.length == 0) {
      res.status(200).json({
        message: "no payments for this loan id",
      });
      return;
    }
    res.status(201).json(payData);
  } catch (error) {
    res.status(404).json({
      message: `error while fetching data ${error.message}`,
    });
  }
};
