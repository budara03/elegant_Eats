import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/sendOTP.js";
import sendOTP from "../utils/sendOTP.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";


//register user and send otp to email

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const cleanPhone = phone ? phone.toString().replace(/\D/g, '') : null;
    if (!cleanPhone || cleanPhone.length !== 10) {
      return res.status(400).json({ message: "Invalid phone number" }); 

    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        if (existingUser.isVerified) {
            return res.status(400).json({ message: "User already exists and is verified" });
            await User.findOneAndUpdate({ email }, { name, password, phone });

        }
      const otp = generateOTP(6,{uppercaseAlphabets:false, lowercaseAlphabets:false, specialChars:false});
      // Sent OTP to user's email
      try {
        await sendOTP(email, otp);
        existingUser.otp = otp;
        await existingUser.save();
        return res.status(200).json({ message: "OTP sent to email" });

      }
      catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Error sending OTP" });
      }

      const hashedpassword = await bcrypt.hash(password, 10);
      const OTPExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
      const UserID = `EE-${uuidv4().slice(0, 8)}`; // Generate a unique user ID

      const user = await User.create({
        name,
        email,
        password: hashedpassword,
        phone: cleanPhone,
        otp,
        OTPExpires,
        UserID,
      }); 
      res.status(201).json({ message: "User registered successfully. OTP sent to email.", user });
    }  
  }
  catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}

  //verify otp
  export async function verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
      if (new Date() > user.OTPExpires) {
        return res.status(400).json({ message: "OTP has expired" });
      }
      user.isVerified = true;
      user.otp = undefined;
      user.OTPExpires = undefined;
      await user.save();
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //Complete profile 
  export async function completeProfile(req, res) {
    try {
      const { email, address, city, state, zip } = req.body;
      if (!email || !address || !city || !state || !zip) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!user.isVerified) {
        return res.status(400).json({ message: "User is not verified" });
      }

      user.address = address;
      user.city = city;
      user.state = state;
      user.zip = zip;
      await user.save();
      res.status(200).json({ message: "Profile completed successfully" });
    } catch (error) {
      console.error("Error completing profile:", error);
      res.status(500).json({ message: "Internal server error" && error.message });
    }
  }

  //login user
  export async function loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: "Email and password are required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: "User not found" });
      }
      if (!user.isVerified) {
        return res.status(403).json({ 
          success: false,
          message: "Please verify your email with the OTP before logging in." });
      }
      if(!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid password" });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.status(200).json({ 
        success: true,
        message: "Login successful",
        token });


      
    }catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
          success: false,
          message: error.message && "Internal server error"
        });
      }
    }

    //get user profile (get by userid)
    export async function getUserProfile(req, res) {
      try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, user });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }

    //update user profile
    export async function updateUserProfile(req, res) {
      try {