const express = require('express');
const router = express.Router();
const eventsControllers = require('../controllers/eventsControllers');
const multer = require('multer');
const path = require('path');

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Only images are allowed'));
        }
        cb(null, true);
    }
});

// Routes
router.get('/', eventsControllers.getAllEvents);
router.get('/:id', eventsControllers.getEventById);
router.post('/', upload.single('image'), eventsControllers.createEvent);  // Add image upload
router.put('/:id', upload.single('image'), eventsControllers.updateEvent);  // Add image upload
router.delete('/:id', eventsControllers.deleteEvent);

module.exports = router;
