import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { getConnection } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const connection = getConnection();

    const [admin] = await connection.execute(
      'SELECT * FROM admin WHERE email = ?',
      [email]
    );

    if (admin.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const adminData = admin[0];
    const isPasswordValid = await bcrypt.compare(password, adminData.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: adminData.id_admin, email: adminData.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      admin: {
        id: adminData.id_admin,
        email: adminData.email,
        nom: adminData.nom,
        prenom: adminData.prenom
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;