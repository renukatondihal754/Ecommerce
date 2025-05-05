const db = require('../config/dbConfig');  // your database config (pg)

// Admin Login Controller
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin exists with the provided email
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    const user = result.rows[0];  // Get the first user if exists

    if (!user) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Compare the password directly (you should ideally hash and compare passwords)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    // Optional: Check if the user is the admin (based on the name field)
    if (user.name !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
