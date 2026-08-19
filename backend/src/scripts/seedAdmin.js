require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

async function seedAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Uso: node src/scripts/seedAdmin.js <email> <password>');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Ya existe un usuario con ese email.');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash, role: 'admin' });

  console.log(`Usuario admin creado: ${email}`);
  process.exit(0);
}

seedAdmin();
