const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/appointments — obtener todas las citas reservadas
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM appointment ORDER BY date ASC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /api/appointments/:id — obtener una cita reservada por id
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM appointment WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Cita no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/appointments — crear una cita resevada
router.post('/', async (req, res) => {
    const { client_id, date, time, status, notes } = req.body;
    if (!date) return res.status(400).json({ error: 'La fecha es obligatoria' });
    try {
        const { rows } = await db.query(
            `INSERT INTO appointment (client_id ,date, time, status, notes)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [client_id, date, time, status, notes]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// PUT /api/appointments/:id — editar una cita reservada
router.put('/:id', async (req, res) => {
    const { client_id, date, time, status, notes } = req.body;
    try {
        const { rows } = await db.query(
            `UPDATE appointment SET client_id=$1, date=$2, time=$3, status=$4, notes=$5
             WHERE id=$6 RETURNING *`,
            [client_id, date, time, status, notes, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Cita no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// DELETE /api/appointments/:id — eliminar una cita reservada
router.delete('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('DELETE FROM appointment WHERE id = $1 RETURNING *', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Cita no encontrada' });
        res.json({ message: 'Cita eliminada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
