const Event = require('../models/Event');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [Category, Subcategory]
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, {
            include: [Category, Subcategory]
        });
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, caption, date, registrationLink, categoryId, subcategoryId } = req.body;
        const imagePath = req.file ? `fe-shesterhood/public/uploads/${req.file.filename}` : null;

        const event = await Event.create({
            title,
            caption,
            date,
            registrationLink,
            imagePath,
            categoryId,
            subcategoryId
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { title, caption, date, registrationLink, categoryId, subcategoryId } = req.body;
        const imagePath = req.file ? `fe-shesterhood/public/uploads/${req.file.filename}` : req.body.imagePath;

        const [updated] = await Event.update({
            title,
            caption,
            date,
            registrationLink,
            imagePath,
            categoryId,
            subcategoryId
        }, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedEvent = await Event.findByPk(req.params.id);
            res.status(200).json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const deleted = await Event.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
