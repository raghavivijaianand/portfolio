const router = require('express').Router();
const Project = require('../models/Project');
const Message = require('../models/Message');

const admin = (req, res, next) =>
  req.get('x-admin-key') === process.env.ADMIN_KEY ? next() : res.status(401).json({ error: 'Invalid admin key' });

router.get('/projects', async (req, res) => {
  try { res.json(await Project.find().sort({ featured: -1, createdAt: -1 })); }
  catch (e) { res.status(500).json({ error: e.message }); }
});
router.post('/projects', admin, async (req, res) => {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});
router.put('/projects/:id', admin, async (req, res) => {
  try { res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })); }
  catch (e) { res.status(400).json({ error: e.message }); }
});
router.delete('/projects/:id', admin, async (req, res) => {
  try { await Project.findByIdAndDelete(req.params.id); res.json({ deleted: true }); }
  catch (e) { res.status(400).json({ error: e.message }); }
});
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Message.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch (e) { res.status(400).json({ error: 'Please fill in name, email and message.' }); }
});
module.exports = router;
