const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); // plain PostgreSQL

// Add item to cart (without user_id)
router.post('/addcart', async (req, res) => {
    const { product_id, quantity } = req.body;
    try {
      const result = await db.query(
        `INSERT INTO cart_items (product_id, quantity)
         VALUES ($1, $2)
         RETURNING *`,
        [product_id, quantity || 1]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add to cart', details: err });
    }
  });
  
  // Get all cart items (no user_id required)
  router.get('/getcart', async (req, res) => {
    try {
      const result = await db.query(
        `SELECT c.id, c.quantity, p.name, p.price, p.image
         FROM cart_items c
         JOIN products p ON c.product_id = p.id`
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get cart items', details: err });
    }
  });

  // DELETE cart item by ID
router.delete('/deletecart/:id', (req, res) => {
    const itemId = req.params.id;
  console.log('Deleting item with ID:', itemId); // Debugging line
    const query = 'DELETE FROM cart_items WHERE id = $1';
    db.query(query, [itemId], (err, result) => {
      if (err) {
        console.error('Error deleting cart item:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Cart item deleted successfully' });
    });
  });
  

module.exports = router;
