const streamifier = require('streamifier');
const Quote = require('../models/Quote');
const cloudinary = require('../config/cloudinary');

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'optica-andina/recetas', resource_type: 'auto' },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

async function createQuote(req, res, next) {
  try {
    let recipeUrl = '';
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      recipeUrl = uploaded.secure_url;
    }

    const quote = await Quote.create({ ...req.body, recipeUrl });

    res.status(201).json(quote);
  } catch (error) {
    next(error);
  }
}

async function getQuotes(req, res, next) {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const quotes = await Quote.find(filter).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    next(error);
  }
}

async function updateQuoteStatus(req, res, next) {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!quote) return res.status(404).json({ message: 'Consulta no encontrada' });
    res.json(quote);
  } catch (error) {
    next(error);
  }
}

async function updateQuote(req, res, next) {
  try {
    const { name, phone, consultationType, message } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { name, phone, consultationType, message },
      { new: true, runValidators: true }
    );
    if (!quote) return res.status(404).json({ message: 'Consulta no encontrada' });
    res.json(quote);
  } catch (error) {
    next(error);
  }
}

async function deleteQuote(req, res, next) {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Consulta no encontrada' });
    res.json({ message: 'Consulta eliminada' });
  } catch (error) {
    next(error);
  }
}

module.exports = { createQuote, getQuotes, updateQuoteStatus, updateQuote, deleteQuote };
