require('dotenv').config();  // 👈 This line is essential!
const express = require('express');
const cors = require('cors');


// const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productsRoutes'); // <- fixed name
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
