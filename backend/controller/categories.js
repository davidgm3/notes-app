const Category = require('../model/Category');

//creates a new category
const createCategory = async (req, res) => {
	const category = new Category({
		title: req.body.title,
	});
	await category.save();
	res.status(201).json(category);
	console.log('createCategory success: ' + category.id);
};

//responds with all categories
const getAllCategories = async (req, res) => {
	const categories = await Category.find({});
	res.status(200).json(categories);
	console.log('getAllCategories success');
};

module.exports = {
	createCategory,
	getAllCategories,
};
