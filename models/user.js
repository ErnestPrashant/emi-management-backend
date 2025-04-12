import mongoose,{ Schema, model } from "mongoose"

const UserSchema = new Schema({
    firstname : {type : String, required:[true,'Name is required'], trim:true},
    lastname : {type: String, trim:true}, 
    password : {type : String, required: true}, 
    email : {type:String, required: true, unique:true, trim:true}, 
    loans : [{type:mongoose.Schema.Types.ObjectId, ref:'Loan'}],
}, {timestamps:true}
)

const User = model("Users", UserSchema)

export default User;