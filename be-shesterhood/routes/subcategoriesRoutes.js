const express = require('express');
const router = express.Router();
const subcategoriesControllers = require('../controllers/subcategoriesController');

// Routes for Subcategories
router.get('/', subcategoriesControllers.getAllSubcategories);  // GET all subcategories
router.get('/:id', subcategoriesControllers.getSubcategoryById);  // GET subcategory by ID
router.post('/', subcategoriesControllers.createSubcategory);  // POST new subcategory
router.put('/:id', subcategoriesControllers.updateSubcategory);  // PUT update subcategory by ID
router.delete('/:id', subcategoriesControllers.deleteSubcategory);  // DELETE subcategory by ID

module.exports = router;
