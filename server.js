require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Project = require('./models/Project');
const Message = require('./models/Message');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Projects CRUD
app.get('/api/projects', async (_req, res) => {
  res.json(await Project.find().sort({ createdAt: -1 }));
});
app.post('/api/projects', async (req, res) => {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});
app.put('/api/projects/:id', async (req, res) => {
  res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});
app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Contact form
app.post('/api/contact', async (req, res) => {
  try { await Message.create(req.body); res.status(201).json({ ok: true }); }
  catch (e) { res.status(400).json({ error: 'Name, email and message are required.' }); }
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio')
  .then(async () => {
    if (!(await Project.countDocuments())) {
      await Project.insertMany([
        { title: 'Task Manager', description: 'A CRUD app to create and track tasks.', tech: ['Node.js', 'MongoDB'], link: '#' },
        { title: 'E-Commerce Store', description: 'Product catalog with cart and orders.', tech: ['React', 'Express'], link: '#' }
      ]);
    }
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
  })
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
