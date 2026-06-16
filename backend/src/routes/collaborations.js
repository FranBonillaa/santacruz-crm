const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM "collaboration" ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.post('/', async (req, res) => {
    const { brand_name, category, contact, status, responsible, notes } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO "collaboration" (brand_name, category, contact, status, responsible, notes) VALUES ($1,$2,$3,$4,$5,$6)  RETURNING id',
            [brand_name, category, contact, status, responsible, notes]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    const { brand_name, category, contact, status, responsible, notes } = req.body;

    try {
        await db.query(
            'UPDATE "collaboration" SET brand_name=$1, category=$2, contact=$3, status=$4, responsible=$5, notes=$6 WHERE id=$7',
            [brand_name, category, contact, status, responsible, notes, req.params.id]
        );
        res.json({ message: 'Colaboración actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM "collaboration" WHERE id=$1', [req.params.id]);
        res.json({ message: 'Colaboración eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;