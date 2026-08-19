const Brand = require('../models/Brand');

async function getBrands(req, res, next) {
  try {
    const { activeOnly } = req.query;
    const filter = activeOnly === 'true' ? { active: true } : {};
    const brands = await Brand.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(brands);
  } catch (error) {
    next(error);
  }
}

async function createBrand(req, res, next) {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json(brand);
  } catch (error) {
    next(error);
  }
}

async function updateBrand(req, res, next) {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!brand) return res.status(404).json({ message: 'Marca no encontrada' });
    res.json(brand);
  } catch (error) {
    next(error);
  }
}

async function deleteBrand(req, res, next) {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Marca no encontrada' });
    res.json({ message: 'Marca eliminada' });
  } catch (error) {
    next(error);
  }
}

module.exports = { getBrands, createBrand, updateBrand, deleteBrand };
