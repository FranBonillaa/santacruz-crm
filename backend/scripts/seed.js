require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../src/config/db');

async function seed() {
    const name = 'Admin';
    const email = 'fbonillavaro@gmail.com';
    const password = await bcrypt.hash('root123', 10);

    await db.query(
        'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3)',
        [name, email, password]
    );

    console.log('Usuario creado correctamente');
    process.exit(0);
}

seed();
