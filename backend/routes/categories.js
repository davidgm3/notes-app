const express = require("express");
const {
	createCategory,
	getAllCategories,
} = require("../controller/categories");
const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);

module.exports = router;
