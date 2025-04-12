import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    principal : {
        type : Number, 
        required : true,
    },
    annualInterestRate : {
        type : Number, 
        require : true,
    }, 
    tenure : {
        type : Number, 
        required : true,
    },
    monthlyEMI: {
        type: Number,
    },
    remainingBalance : {
        type : Number, 
    }, 
    startDate : {
        type : Date,
        default : Date.now()
    },
    payments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Payment',
    }]
},{timestamps:true})

const Loan = mongoose.model('Loans', LoanSchema)

export default Loan;