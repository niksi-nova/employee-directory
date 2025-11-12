const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');

// Create employee (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.json(emp);
  } catch(err){ console.error(err); res.status(500).json({ msg: 'Server error' }); }
});

// Read with basic search & filter ?q=term & department=
router.get('/', auth, async (req, res) => {
  try {
    const { q, department } = req.query;
    const filter = {};
    if(department) filter.department = department;
    if(q) {
      const re = new RegExp(q, 'i');
      filter.$or = [{ firstName: re }, { lastName: re }, { email: re }, { title: re }, { department: re }];
    }
    const list = await Employee.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch(err){ console.error(err); res.status(500).json({ msg: 'Server error' }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if(!emp) return res.status(404).json({ msg: 'Not found' });
    res.json({ msg: 'Deleted' });
  } catch(err){ console.error(err); res.status(500).json({ msg: 'Server error' }); }
});

module.exports = router;
