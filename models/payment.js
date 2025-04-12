import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    loanId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Loan'
    },
    amountPaid : {
        type: Number,
        required : [true]
    },
    datePaid : {
        type : Date,
        default : Date.now,
    }
},{timestamps:true})

const Payment = mongoose.model('Payments', paymentSchema)

export default Payment;