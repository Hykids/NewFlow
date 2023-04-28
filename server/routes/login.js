import express from 'express'
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.js';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password,role } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ access_token: token,role: user.role,id:user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;