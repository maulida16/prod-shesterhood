const Subcategory = require('../models/Subcategory');

exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByPk(req.params.id);
        if (subcategory) {
            res.json(subcategory);
        } else {
            res.status(404).json({ message: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.create(req.body);
        res.status(201).json(subcategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSubcategory = async (req, res) => {
    try {
        const [updated] = await Subcategory.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedSubcategory = await Subcategory.findByPk(req.params.id);
            res.status(200).json(updatedSubcategory);
        } else {
            res.status(404).json({ message: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSubcategory = async (req, res) => {
    try {
        const deleted = await Subcategory.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
