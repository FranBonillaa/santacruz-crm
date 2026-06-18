const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/clients — obtener todas las clientas
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM client ORDER BY name ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /api/clients/:id — obtener una clienta por id
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM client WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Clienta no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/clients — crear una clienta
router.post('/', async (req, res) => {
    const { name, last_name, phone, email, birth_date, notes } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });
    try {
        const { rows } = await db.query(
            `INSERT INTO client (name, last_name, phone, email, birth_date, notes)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, last_name, phone, email, birth_date, notes]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// PUT /api/clients/:id — editar una clienta
router.put('/:id', async (req, res) => {
    const { name, last_name, phone, email, birth_date, notes } = req.body;
    try {
        const { rows } = await db.query(
            `UPDATE client SET name=$1, last_name=$2, phone=$3, email=$4, birth_date=$5, notes=$6
             WHERE id=$7 RETURNING *`,
            [name, last_name, phone, email, birth_date, notes, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Clienta no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// DELETE /api/clients/:id — eliminar una clienta
router.delete('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('DELETE FROM client WHERE id = $1 RETURNING *', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Clienta no encontrada' });
        res.json({ message: 'Clienta eliminada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
