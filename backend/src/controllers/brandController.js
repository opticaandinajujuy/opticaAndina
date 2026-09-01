const Brand = require('../models/Brand');

async function getBrands(req, res, next) {
  try {
    const filter = req.query.all === 'true' ? {} : { active: true };
    const brands = await Brand.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(brands);
  } catch (error) {
    next(error);
  }
}

async function createBrand(req, res, next) {
  try {
    const count = await Brand.countDocuments();
    const brand = await Brand.create({
      name: req.body.name,
      logoUrl: req.body.logoUrl,
      order: count,
    });
    res.status(201).json(brand);
  } catch (error) {
    next(error);
  }
}

async function updateBrand(req, res, next) {
  try {
    const { name, logoUrl, order, active } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (logoUrl !== undefined) update.logoUrl = logoUrl;
    if (order !== undefined) update.order = order;
    if (active !== undefined) update.active = active;

    const brand = await Brand.findByIdAndUpdate(req.params.id, update, {
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
