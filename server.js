const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/', 'register.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/', 'dashboard.html'));
});

app.get('/generator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/', 'generator.html'));
});



app.listen(8080, () => console.log('Rick and Morty App is listening on port 8080.'));
