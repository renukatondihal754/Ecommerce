const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); // plain PostgreSQL
const multer = require('multer');
const path = require('path');


// Setup upload location and filename
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
  });

  const upload = multer({ storage });


// GET all products with category name
router.get('/', async (req, res) => {
    try {
      const result = await db.query(`
        SELECT p.*, c.category AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
      `);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch products', details: err });
    }
  });
  


// POST new product
router.post('/', upload.single('image'), async (req, res) => {
    const { name, price, description, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    
    try {
      const result = await db.query(
        'INSERT INTO products (name, image, price, description, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, imagePath, price, description, category] // category is now category_id
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err); // ADD THIS for debugging
      res.status(500).json({ error: 'Failed to add product', details: err });
    }
    
  });
  

// PUT update product
router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;
  
    try {
        const result = await db.query(
            'UPDATE products SET name = $1, image = $2, price = $3, description = $4, category_id = $5 WHERE id = $6 RETURNING *',
            [name, imagePath, price, description, category, id]
          );
          
      if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update product', details: err });
    }
  });
  

// DELETE product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err });
  }
});

// GET products by category name (for homepage)
router.get('/by-category', async (req, res) => {
    const { category } = req.query;
  
    if (!category) {
      return res.status(400).json({ error: 'Category name is required' });
    }
  
    try {
      const result = await db.query(`
        SELECT p.*, c.category AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE c.category = $1
      `, [category]);
  
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch products by category', details: err });
    }
  });
  

module.exports = router;
