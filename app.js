require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const authenticateToken = require('./middlewares/authMiddleware');
const multer = require('multer');
const cors = require('cors');

// Pastikan jalur import benar
const Category = require('./models/Category'); 
const Subcategory = require('./models/Subcategory');
const Event = require('./models/Event');

// Import routes
const usersRoutes = require('./routes/usersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const subcategoriesRoutes = require('./routes/subcategoriesRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const publicEventsRoutes = require('./routes/publicEventsRoutes');

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, './src')));
app.use('/dist', express.static(path.join(__dirname, './dist')));
app.use('/public', express.static(path.join(__dirname, './public')));

// Setup storage untuk multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './public/uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

// Rute
app.get('/events.html', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, './src/events.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './src/login.html'));
});

app.get('/api/verify-token', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

app.use('/api/public-events', publicEventsRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src', 'index.html'));
});

app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/subcategories', subcategoriesRoutes);
app.use('/api/events', authenticateToken, eventsRoutes);
app.use('/api/events', publicEventsRoutes); // Pastikan ini menggunakan router function

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
