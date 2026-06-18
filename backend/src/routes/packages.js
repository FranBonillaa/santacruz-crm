const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/packages — obtener todos los bonos
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM package ORDER BY name ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /api/packages/:id — obtener un bono por id
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM package WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Bono no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/packages — crear un bono
router.post('/', async (req, res) => {
    const { name, description, price, total_sessions, is_active } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });
    if (!price) return res.status(400).json({ error: 'El precio es obligatorio' });
    if (!total_sessions) return res.status(400).json({ error: 'El número de sesiones es obligatorio' });
    try {
        const { rows } = await db.query(
            `INSERT INTO package (name, description, price, total_sessions, is_active)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, description, price, total_sessions, is_active ?? true]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// PUT /api/packages/:id — editar un bono
router.put('/:id', async (req, res) => {
    const { name, description, price, total_sessions, is_active } = req.body;
    try {
        const { rows } = await db.query(
            `UPDATE package SET name=$1, description=$2, price=$3, total_sessions=$4, is_active=$5
             WHERE id=$6 RETURNING *`,
            [name, description, price, total_sessions, is_active, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Bono no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// DELETE /api/packages/:id — eliminar un bono
router.delete('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('DELETE FROM package WHERE id = $1 RETURNING *', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Bono no encontrado' });
        res.json({ message: 'Bono eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
