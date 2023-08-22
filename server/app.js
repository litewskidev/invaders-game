const express = require('express');
const path = require('path');
const app = express();

// PARSING
app.use(express.json());

//  API
app.get('/api', (req, res) => {
  res.send('Server works!');
});

//  ROUTING
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }});
});

//  PORT
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log('Server started on port 8888');
});
