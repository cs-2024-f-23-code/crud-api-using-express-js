const Product = require('../models/Product');

exports.create = async (req, res, next) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    const product = await Product.create(data);
    res.status(201).json({ success: true, product });
  } catch (error) { next(error); }
};

exports.list = async (req, res, next) => {
  try {
    const { category, search, sort = '-createdAt' } = req.query;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
    const sortOptions = { price: 'price', '-price': '-price', date: 'createdAt', '-date': '-createdAt', name: 'name', '-name': '-name' };
    const sortBy = sortOptions[sort] || '-createdAt';
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortBy).skip((page - 1) * limit).limit(limit).populate('createdBy', 'name email'),
      Product.countDocuments(filter)
    ]);
    res.json({ success: true, products, pagination: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

exports.getOne = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    delete updates.createdBy;
    if (req.file) updates.image = `/uploads/${req.file.filename}`;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) { next(error); }
};

exports.summary = async (_req, res, next) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: '$category', productCount: { $sum: 1 }, averagePrice: { $avg: '$price' } } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, category: '$_id', productCount: 1, averagePrice: { $round: ['$averagePrice', 2] } } }
    ]);
    res.json({ success: true, categories });
  } catch (error) { next(error); }
};
