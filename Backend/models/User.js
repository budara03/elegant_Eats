import mongoose from "mongoose";
import { stringify } from "uuid";

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
    role: { 
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
    },
    phone : {
    type: String,
    required: true,
    },
    otp:string,
    otpExpiry:Date,
    isVerified:{
    type: Boolean,
    default: false
    }

});

export default mongoose.model("User", userSchema);