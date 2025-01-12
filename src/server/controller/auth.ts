import { Request, Response } from 'express';

export const auth = {
  register: async (req: Request, res: Response) => {
    try {
    //   const { username, password } = req.body;
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   const user = new User({ username, password: hashedPassword });
    //   await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  },
};
