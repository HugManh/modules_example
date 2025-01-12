require('dotenv').config({ path: '.env.local' });
import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export const auth = {
  register: async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: 'Missing email and/or password' });
      return;
    }

    try {
      const user = await User.findOne({ email });
      if (user) {
        res
          .status(400)
          .json({ success: false, message: 'The user already exists' });
        return;
      }

      const newUser = await User.create({
        name,
        email,
        password,
      });

      // return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        accessToken,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred in creating the user',
      });
    }
  },
};
