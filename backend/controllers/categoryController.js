// Dummy example. Replace with DB logic later
exports.getCategories = (req, res) => {
    const categories = [
      { id: 1, name: 'Jewellery' },
      { id: 2, name: 'Accessories' },
      { id: 3, name: 'Beauty' }
    ];
    res.json(categories);
  }; 
  