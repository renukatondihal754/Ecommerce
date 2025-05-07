import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, ListGroup, Modal } from 'react-bootstrap';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    price: '',
    description: '',
    category: ''
  });

  // Fetch products from the server
  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Load categories on mount

  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = () => {
    setIsEditing(false);
    setNewProduct({
      name: '',
      image: '',
      price: '',
      description: '',
      category: ''
    });
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setNewProduct({
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
      category: product.category_id  // this is what dropdown expects
    });
  };

  const handleSaveProduct = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }
  
    if (isEditing) {
      // You may need to update the PUT method to handle multipart/form-data
      await axios.put(`http://localhost:5000/api/products/${currentProduct.id}`, formData);
      alert('Product updated successfully!');

    } else {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product added successfully!');
    }
  
    fetchProducts();
    setIsEditing(false);
    setNewProduct({
      name: '',
      image: '',
      price: '',
      description: '',
      category: ''
    });
  };
  

  const handleRemoveProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/api/products/${productId}`);
    fetchProducts();  // Reload products after deletion
  };

  return (
    <Container>
      <h1 className="my-4">Admin Dashboard</h1>

      {/* Add/Edit Product Form */}
      <Card className="mb-4">
        <Card.Body>
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <Form encType="multipart/form-data">

            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>

          

            <Form.Group controlId="productImage">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
                type="file"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>

            <Form.Control className='mt-3'
            as="select"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
            <option value="">Select category</option>
            {categories.map((cat) => (
               <option key={cat.id} value={cat.id}>
               {cat.category}
             </option>
             
            ))}
            </Form.Control>


            <Button variant="primary" className='mt-5' onClick={handleSaveProduct}>
              {isEditing ? 'Save Changes' : 'Add Product'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* List of Products */}
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
            <img src={`http://localhost:5000${product.image}`} className="card-img-top" alt={product.name}
            style={{height: '200px', width: '100%', objectFit: 'contain'}} />
            
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                {/* <Card.Text>Price: ₹{product.price}</Card.Text> */}
                <Card.Text>Price: ₹{parseFloat(product.price).toFixed(2)}</Card.Text>

                <Card.Text>Description: {product.description}</Card.Text>
                {/* <Card.Text>Category: {product.category}</Card.Text> */}
                <Card.Text>Category: {product.category_name}</Card.Text>

                <Button variant="warning" onClick={() => handleEditProduct(product)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
