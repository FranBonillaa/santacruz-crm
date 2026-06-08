require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./config/db');

async function migrate() {
    const sql = fs.readFileSync(path.join(__dirname, '../schema.sql'), 'utf8');
    const statements = sql.split(';').filter(s => s.trim());

    for (const statement of statements) {
        await db.query(statement);
    }

    console.log('Schema ejecutado correctamente');
    process.exit(0);
}

migrate();
