const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	content: {
		type: String,
	},
	lastEditedAt: {
		type: Date,
		default: Date.now(),
	},
	categories: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model("Note", NoteSchema);
