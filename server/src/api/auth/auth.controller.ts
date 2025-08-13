import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, {SignOptions} from "jsonwebtoken";

const router = express.Router();

interface User {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

const users = new Map<string, User>(); // In-memory user store

const JWT_SECRET: string = process.env.JWT_SECRET || "defaultsecret";
const TOKEN_EXPIRY: string = process.env.TOKEN_EXPIRY || "1d";

// Signup

export const signup = async (req: Request, res: Response) => {

  try{
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword){
      return res.status(400).json({error: "All feild are required"});
    }

    if(password !== confirmPassword){
      return res.status(400).json({error: "Password do not matched"})
    }

    if (users.has(email)){
      return res.status(409).json({error: "User already exists"})
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser: User = {firstName, lastName, email, passwordHash}
    users.set(email, newUser)
    
    const payload = { email, firstName, lastName };
    const options: SignOptions = { expiresIn: TOKEN_EXPIRY as jwt.SignOptions["expiresIn"] };
    const token = jwt.sign(payload, JWT_SECRET, options);

        res.status(201).json({
      message: "User registered successfully",
      token
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }

}

// Login

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;

    if (!email || !password){
      return res.status(400).json({error: "Email and Password are required"})
    }

    const user = users.get(email)
    if(!user){
      return res.json(401).json({error: "Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if(!isMatch){
      return res.json(401).json({error: "Invalid credentials"})
    }

    const payload = { email: user.email, firstName: user.firstName, lastName: user.lastName };
    const options: SignOptions = { expiresIn: TOKEN_EXPIRY as jwt.SignOptions["expiresIn"] };
    const token = jwt.sign(payload, JWT_SECRET, options);

    res.json({
      message:"Login successful",
      token
    })
  }catch(err){
    console.error("Login error:", err)
    res.status(500).json({error: "Internal Server Error"})
  }
}


