import connectDB from '../config/database.js';
import { User } from '../model/user.js';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRETE_KEY =process.env.SECRETE_KEY || 'dfosdfbksdl23290u23n23ndslsdfnwdfnsdow4'

export const registerUser = async (req, res) => {
    const {username, name, password} = req.body;
    const db = await connectDB();
    const userModel = new User(db);

    try {
        
        const user = await userModel.getByUsername(username)
        if(user){
            res.status(400).json(`user with "${username} username already exit`)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userModel.create(username, name, hashedPassword);

        res.status(201).json(`User created succefully`)
    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`)
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;
    const db = await connectDB();
    const userModel = new User(db);

    try {
        

        //validate user exist in db
        const user = await userModel.getByUsernamePassword(username)
        if(!user){
            return res.status(401).json(`Invalid username or password`)
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).json(`Invalid password`)
        }
        

        //define user credentials
        const payload = {
            "id":user.id,
            "username":user.username
        }

        const token = jwt.sign(payload, SECRETE_KEY, {expiresIn:process.env.EXPIRE_IN || '1d'});


        res.cookie('token', token, {
            httponly:true,
            secure:true,
            maxAge:60*60*1000 //cookies expires in an hour
        })


        res.status(200).json('Login successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(`Internal Server Error: ${error}`)
    }
}

export const logout = async (req, res) => {
    try {
        
        res.clearCookie('token');
        res.status(200).json('Logout successfully')
        
    } catch (error) {
        res.status(500).json(`Internal Server Error: ${error}`)
    }
}