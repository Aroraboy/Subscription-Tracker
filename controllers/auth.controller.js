import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWt_Secret, JWT_EXPIRES_IN } from '../config/index.js';

export const signUp = async (req, res, next) => {
    const session =await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        const existingUser = await UserActivation.findOne({ email });

        if(existingUser) {
            const error = new Error('User already exists');
            error.status = 409;
            throw error;    
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userRouter.create([{ name, email, password: hashPassword }], {session });

        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUser[0],
                token
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {}

export const signOut = async (req, res, next) => {}