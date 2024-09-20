const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const path = require('path');

// Mapping kategori dan subkategori
const categoryMapping = {
    1: 'She-Talks',
    2: 'She-Gath',
    3: 'She-Class',
    4: 'She-Sport',
    5: 'She-Share'
};

const subcategoryMapping = {
    1: 'Membership',
    2: 'Non Membership',
    3: 'Member & Non Member',
    4: 'Business',
    5: 'Non Business',
    6: 'Paid',
    7: 'Paid',
    8: 'Free'
};


router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [
                { model: Category, attributes: ['name'] },
                { model: Subcategory, attributes: ['name'] }
            ]
        });

        // Log output untuk memastikan data yang dikirim
        //console.log('Events data from backend:', JSON.stringify(events, null, 2));

        const modifiedEvents = events.map(event => {
            const relativeImagePath = event.imagePath.replace(/^.*\/public\/uploads/, '/public/uploads');

            return {
                id: event.id,
                title: event.title,
                caption: event.caption,
                imagePath: path.join('..', relativeImagePath),
                date: event.date,
                registrationLink: event.registrationLink,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
                Category: categoryMapping[event.categoryId] || 'Unknown Category',
                Subcategory: subcategoryMapping[event.subcategoryId] || 'Unknown Subcategory'
            };
        });
        res.json(modifiedEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});


module.exports = router;
