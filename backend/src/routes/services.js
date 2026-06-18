const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/services — obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM service ORDER BY category_id ASC, name ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /api/services/:id — obtener un servicio por id
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM service WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Servicio no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/services — crear un servicio
router.post('/', async (req, res) => {
    const { category_id, name, description, price, duration_min, is_active } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });
    try {
        const { rows } = await db.query(
            `INSERT INTO service (category_id, name, description, price, duration_min, is_active)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [category_id, name, description, price, duration_min, is_active ?? true]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// PUT /api/services/:id — editar un servicio
router.put('/:id', async (req, res) => {
    const { category_id, name, description, price, duration_min, is_active } = req.body;
    try {
        const { rows } = await db.query(
            `UPDATE service SET category_id=$1, name=$2, description=$3, price=$4, duration_min=$5, is_active=$6
             WHERE id=$7 RETURNING *`,
            [category_id, name, description, price, duration_min, is_active, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Servicio no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// DELETE /api/services/:id — eliminar un servicio
router.delete('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('DELETE FROM service WHERE id = $1 RETURNING *', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Servicio no encontrado' });
        res.json({ message: 'Servicio eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
