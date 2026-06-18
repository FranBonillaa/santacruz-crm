require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../src/config/db');

async function seed() {
    const name = 'Admin';
    const email = 'mariafornet05@gmail.com';
    const password_hash = await bcrypt.hash('root2005', 10);

    await db.query(
        'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
        [name, email, password_hash]
    );

    console.log('Usuario creado correctamente');
    process.exit(0);
}

seed();
