import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";

import authRouters from './routes/authRouters.js'
import loansRoutes from './routes/loansRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import cors from 'cors';

dotenv.config();           //loan .env file variables
const app = express();
connectDB();
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;

app.use('/api/users', authRouters);
app.use('/api/loans', loansRoutes);
app.use('/api/payments', paymentRoutes);


app.listen(PORT, () => {
    console.log(`example port listening on ${PORT}` );
})