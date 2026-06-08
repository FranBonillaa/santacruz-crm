const express = require('express');
const router = express.router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM collaboration ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});