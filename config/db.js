import mongoose,{Schema, model} from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL//,{
            //useNewUrlParser:true,
           // useUnifiedTopology:true
        //}
    );
        console.log("mongodb connected successfully ")
    }
    catch(error){
        console.log("mongodb connection failed ",error.message)
    }
}
export default connectDB;
