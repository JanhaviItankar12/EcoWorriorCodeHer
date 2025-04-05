import express from "express"
const router = express.Router();
import Admin from "../models/Admin.js";
import User from "../models/User.js";

//  GET: Admin details by ID
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//  PUT: Edit admin profile
router.put('/edit/:id', async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


  
  // Delete player
  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Player not found' });
  
      res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

export default router;

