const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve static files from the 'public' folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve the HTML file from the 'src' folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
