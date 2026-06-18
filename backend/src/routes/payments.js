const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/payments — obtener todos los pagos
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM payment ORDER BY paid_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /api/payments/:id — obtener un pago por id
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM payment WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /api/payments — registrar un pago
router.post('/', async (req, res) => {
    const { client_id, appointment_id, client_package_id, concept, amount, payment_method } = req.body;
    if (!amount) return res.status(400).json({ error: 'El importe es obligatorio' });
    try {
        const { rows } = await db.query(
            `INSERT INTO payment (client_id, appointment_id, client_package_id, concept, amount, payment_method)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [client_id, appointment_id, client_package_id, concept, amount, payment_method ?? 'cash']
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// DELETE /api/payments/:id — eliminar un pago
router.delete('/:id', async (req, res) => {
    try {
        const { rows } = await db.query('DELETE FROM payment WHERE id = $1 RETURNING *', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });
        res.json({ message: 'Pago eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
