import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const flag = await User.findOne({ email });
    if (flag) return res.status(400).json({ messsage: "user already exists" });
    //Hashpassword
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      password: hashedPassword,
      email,
    }); // or User.create({firstname, lastname, password:hashedPassword, email});
    await newUser.save();

    res.status(201).json({ messsage: "user created successfully " });
  } catch (error) {
    res.status(500).json({ messsage: error.messsage });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "invalid credentials " });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ✅ false for local development (http)
      sameSite: "Lax", // ✅ 'Lax' allows cross-port on same origin
    });
    res.status(200).json({ message: "login successfully" });
  } catch (error) {
    console.log("Error in login with error", error.message);
    res.status(500).json({ message: error.message });
  }
};
