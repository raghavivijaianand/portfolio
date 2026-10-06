require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const sample = [
  { title: 'Weather Dashboard', description: 'Live forecasts with a 5-day view, built on a public weather API.', tech: ['JavaScript', 'REST API', 'CSS'], liveUrl: '#', repoUrl: '#', featured: true },
  { title: 'Task Tracker', description: 'Full-stack to-do app with user accounts and saved lists.', tech: ['Node.js', 'Express', 'MongoDB'], liveUrl: '#', repoUrl: '#', featured: true },
  { title: 'Recipe Finder', description: 'Search recipes by ingredient and save favourites.', tech: ['React', 'API'], liveUrl: '#', repoUrl: '#' }
];
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Project.deleteMany({});
  await Project.insertMany(sample);
  console.log('Seeded', sample.length, 'projects');
  process.exit(0);
})();
