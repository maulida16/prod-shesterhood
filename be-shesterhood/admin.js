const express = require('express');
const app = express();
const adminRouter = require('./admin'); // Jika `admin.js` berada di root folder

app.use('/admin', adminRouter);

// Middleware dan rute lainnya
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
