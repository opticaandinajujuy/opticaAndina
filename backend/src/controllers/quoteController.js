const streamifier = require('streamifier');
const Quote = require('../models/Quote');
const cloudinary = require('../config/cloudinary');
const { sendQuoteNotification } = require('../utils/sendMail');

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

    sendQuoteNotification(quote).catch((err) =>
      console.error('Error enviando notificación de email:', err.message)
    );

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

module.exports = { createQuote, getQuotes, updateQuoteStatus };
