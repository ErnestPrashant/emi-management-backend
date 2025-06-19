import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cookieparser from "cookie-parser";

import authRouters from './routes/authRouters.js'
import loansRoutes from './routes/loansRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import cors from 'cors';

dotenv.config();           //loan .env file variables
const app = express();
connectDB();
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(cookieparser());
const PORT = process.env.PORT || 5000;

app.use('/api/users', authRouters);
app.use('/api/loans', loansRoutes);
app.use('/api/payments', paymentRoutes);


app.listen(PORT, () => {
    console.log(`example port listening on ${PORT}` );
})