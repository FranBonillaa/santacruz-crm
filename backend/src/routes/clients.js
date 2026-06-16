const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM "client" ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.post('/', async (req, res) => {
    const { date, name, contact, modality, status, responsible, source, amount } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO "client" (date, name, contact, modality, status, responsible, source, amount) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
            [date, name, contact, modality, status, responsible, source, amount]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    const { date, name, contact, modality, status, responsible, source, amount } = req.body;

    try {
        await db.query(
            'UPDATE "client" SET date=$1, name=$2, contact=$3, modality=$4, status=$5, responsible=$6, source=$7, amount=$8 WHERE id=$9',
            [date, name, contact, modality, status, responsible, source, amount, req.params.id]
        );
        res.json({ message: 'Cliente actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM "client" WHERE id=$1', [req.params.id]);
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;