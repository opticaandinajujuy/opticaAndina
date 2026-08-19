require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Aviador Clásico',
    description: 'Lentes de sol estilo aviador, ideales para uso diario.',
    category: 'sol',
    price: 45000,
    measurements: 'Ancho de puente 14mm · Ancho de lente 58mm · Largo de varilla 135mm',
    features: ['Protección UV400', 'Marco metálico', 'Lente polarizado'],
    sizes: ['Único'],
    active: true,
    stock: 8,
  },
  {
    name: 'Wayfarer Urbano',
    description: 'Diseño clásico en acetato, resistente y liviano.',
    category: 'sol',
    measurements: 'Ancho de puente 16mm · Ancho de lente 54mm · Largo de varilla 140mm',
    features: ['Protección UV400', 'Marco de acetato'],
    sizes: ['Único'],
    active: true,
    stock: 5,
  },
  {
    name: 'Lentes de contacto mensuales',
    description: 'Lentes de contacto blandas de reemplazo mensual, alta transpirabilidad.',
    category: 'contacto',
    price: 18000,
    measurements: 'Curva base 8.6 · Diámetro 14.2mm',
    features: ['Uso mensual', 'Alta transpirabilidad', 'Protección UV'],
    sizes: ['-1.00', '-2.00', '-3.00', '-4.00'],
    active: true,
    stock: 20,
  },
  {
    name: 'Lentes de contacto diarias',
    description: 'Lentes de contacto descartables diarias, máxima comodidad.',
    category: 'contacto',
    measurements: 'Curva base 8.5 · Diámetro 14.1mm',
    features: ['Uso diario', 'Sin mantenimiento'],
    sizes: ['-1.00', '-2.00', '-3.00'],
    active: true,
    stock: 30,
  },
  {
    name: 'Armazón Receta Urban',
    description: 'Armazón liviano para lentes recetados, estilo minimalista.',
    category: 'receta',
    price: 38000,
    measurements: 'Ancho de puente 18mm · Ancho de lente 52mm · Largo de varilla 140mm',
    features: ['Marco de titanio', 'Bisagra flex'],
    sizes: ['S', 'M'],
    active: true,
    stock: 6,
  },
  {
    name: 'Armazón Receta Vintage',
    description: 'Armazón de acetato con terminación mate, estilo retro.',
    category: 'receta',
    measurements: 'Ancho de puente 20mm · Ancho de lente 50mm · Largo de varilla 145mm',
    features: ['Marco de acetato', 'Diseño retro'],
    sizes: ['M', 'L'],
    active: true,
    stock: 4,
  },
];

async function seedProducts() {
  await mongoose.connect(process.env.MONGO_URI);

  for (const product of sampleProducts) {
    const exists = await Product.findOne({ name: product.name });
    if (!exists) {
      await Product.create(product);
      console.log(`Creado: ${product.name}`);
    } else {
      console.log(`Ya existe, se omite: ${product.name}`);
    }
  }

  console.log('Listo.');
  process.exit(0);
}

seedProducts();
