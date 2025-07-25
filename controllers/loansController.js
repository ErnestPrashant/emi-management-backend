import express from "express";
import Loan from "../models/loan.js";

export const applyLoan = async (req, res) => {
  try {
    let { principal, rate, tenure, loanName } = req.body;
    let userId = req.userId
    rate = rate / (12 * 100); //monthly rate
    const emi =
      (principal * rate * Math.pow(1 + rate, tenure)) /
      (Math.pow(1 + rate, tenure) - 1);
    const startDate = Date.now();
    const loan = new Loan({
      userId,
      principal,
      annualInterestRate:rate,
      tenure,
      monthlyEMI: emi.toFixed(2),
      remainingBalance: principal,
      startDate,
      loanName
    });
    await loan.save();
    res.status(201).json({
      loan,
    });
  } catch (error) {
    res.status(403).json({
      message: `error while creating loan ${error.message}`,
    });
  }
};

export const getLoans = async (req, res) => {
  try {
    const userId  = req.userId;
    let query = {};
    let data;
    if (userId == "all") {
      data = await Loan.find();
    } else {
      data = await Loan.find({ userId });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `no data found with error ${error.message}`,
    });
  }
};
