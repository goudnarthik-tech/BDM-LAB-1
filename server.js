const express = require('express');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Log the HTTP method, requested path, and response status for every request.
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
});

// GET / - welcome message
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Node.js and Express server!');
});

// GET /about - student and class details
app.get('/about', (req, res) => {
  res.status(200).json({
    name: 'Pandimukkula Narthik Goud',
    section: '214-Cse-2d'
  });
});

// GET /time - current server date and time
app.get('/time', (req, res) => {
  const now = new Date();
  res.status(200).json({
    date: now.toLocaleDateString('en-IN'),
    time: now.toLocaleTimeString('en-IN'),
    timestamp: now.toISOString()
  });
});

// 404 handler for every route not defined above.
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested path "${req.originalUrl}" does not exist.`
  });
});

app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`);
});
