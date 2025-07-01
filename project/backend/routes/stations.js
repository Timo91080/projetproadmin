import express from 'express';
import { body, validationResult } from 'express-validator';
import { getConnection } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all stations
router.get('/', async (req, res) => {
  try {
    const connection = getConnection();
    const [stations] = await connection.execute(`
      SELECT 
        s.id_station,
        s.plateforme,
        b.config_pc,
        e.nombre_manettes,
        COUNT(r.id_reservation) as total_reservations
      FROM stationjeu s
      LEFT JOIN bureau b ON s.id_station = b.id_station
      LEFT JOIN espaceconsole e ON s.id_station = e.id_station
      LEFT JOIN reservation r ON s.id_station = r.id_station
      GROUP BY s.id_station
      ORDER BY s.id_station
    `);

    res.json(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get station by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = getConnection();
    const [station] = await connection.execute(`
      SELECT 
        s.id_station,
        s.plateforme,
        b.config_pc,
        e.nombre_manettes
      FROM stationjeu s
      LEFT JOIN bureau b ON s.id_station = b.id_station
      LEFT JOIN espaceconsole e ON s.id_station = e.id_station
      WHERE s.id_station = ?
    `, [req.params.id]);

    if (station.length === 0) {
      return res.status(404).json({ message: 'Station not found' });
    }

    res.json(station[0]);
  } catch (error) {
    console.error('Error fetching station:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create station
router.post('/', [
  body('plateforme').isIn(['PC', 'Console']),
  body('config_pc').optional().trim(),
  body('nombre_manettes').optional().isInt({ min: 1, max: 8 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { plateforme, config_pc, nombre_manettes } = req.body;
    const connection = getConnection();

    await connection.beginTransaction();

    try {
      // Create station
      const [stationResult] = await connection.execute(
        'INSERT INTO stationjeu (plateforme) VALUES (?)',
        [plateforme]
      );

      const stationId = stationResult.insertId;

      // Create specific station type
      if (plateforme === 'PC') {
        await connection.execute(
          'INSERT INTO bureau (id_station, config_pc) VALUES (?, ?)',
          [stationId, config_pc || '']
        );
      } else if (plateforme === 'Console') {
        await connection.execute(
          'INSERT INTO espaceconsole (id_station, nombre_manettes) VALUES (?, ?)',
          [stationId, nombre_manettes || 2]
        );
      }

      await connection.commit();

      // Get created station
      const [newStation] = await connection.execute(`
        SELECT 
          s.id_station,
          s.plateforme,
          b.config_pc,
          e.nombre_manettes
        FROM stationjeu s
        LEFT JOIN bureau b ON s.id_station = b.id_station
        LEFT JOIN espaceconsole e ON s.id_station = e.id_station
        WHERE s.id_station = ?
      `, [stationId]);

      res.status(201).json(newStation[0]);
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error creating station:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update station
router.put('/:id', [
  body('plateforme').isIn(['PC', 'Console']),
  body('config_pc').optional().trim(),
  body('nombre_manettes').optional().isInt({ min: 1, max: 8 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { plateforme, config_pc, nombre_manettes } = req.body;
    const connection = getConnection();

    await connection.beginTransaction();

    try {
      // Update station
      const [stationResult] = await connection.execute(
        'UPDATE stationjeu SET plateforme = ? WHERE id_station = ?',
        [plateforme, req.params.id]
      );

      if (stationResult.affectedRows === 0) {
        await connection.rollback();
        return res.status(404).json({ message: 'Station not found' });
      }

      // Delete existing specific station data
      await connection.execute(
        'DELETE FROM bureau WHERE id_station = ?',
        [req.params.id]
      );
      await connection.execute(
        'DELETE FROM espaceconsole WHERE id_station = ?',
        [req.params.id]
      );

      // Create new specific station type
      if (plateforme === 'PC') {
        await connection.execute(
          'INSERT INTO bureau (id_station, config_pc) VALUES (?, ?)',
          [req.params.id, config_pc || '']
        );
      } else if (plateforme === 'Console') {
        await connection.execute(
          'INSERT INTO espaceconsole (id_station, nombre_manettes) VALUES (?, ?)',
          [req.params.id, nombre_manettes || 2]
        );
      }

      await connection.commit();

      // Get updated station
      const [updatedStation] = await connection.execute(`
        SELECT 
          s.id_station,
          s.plateforme,
          b.config_pc,
          e.nombre_manettes
        FROM stationjeu s
        LEFT JOIN bureau b ON s.id_station = b.id_station
        LEFT JOIN espaceconsole e ON s.id_station = e.id_station
        WHERE s.id_station = ?
      `, [req.params.id]);

      res.json(updatedStation[0]);
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error updating station:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete station
router.delete('/:id', async (req, res) => {
  try {
    const connection = getConnection();
    
    const [result] = await connection.execute(
      'DELETE FROM stationjeu WHERE id_station = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Station not found' });
    }

    res.json({ message: 'Station deleted successfully' });
  } catch (error) {
    console.error('Error deleting station:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;