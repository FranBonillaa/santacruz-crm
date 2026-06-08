const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM client ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.post('/', async (req, res) => {
    const { date, name, contact, modality, status, responsible, source, amount } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO client (date, name, contact, modality, status, responsible, source, amount) VALUES (?,?,?,?,?,?,?,?)',
            [date, name, contact, modality, status, responsible, source, amount]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    const { date, name, contact, modality, status, responsible, source, amount } = req.body;

    try {
        await db.query(
            'UPDATE client SET date=?, name=?, contact=?, modality=?, status=?, responsible=?, source=?, amount=? WHERE id=?',
            [date, name, contact, modality, status, responsible, source, amount, req.params.id]
        );
        res.json({ message: 'Cliente actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});
