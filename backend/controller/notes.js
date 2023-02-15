const Note = require('../model/Note');

// This function is used to escape special characters in a string, mainly for the search functionality
function regExpEscape(literal_string) {
	return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

//creates a new note
const createNote = async (req, res) => {
	const note = new Note({
		title: req.body.title,
		content: req.body.content,
		categories: req.body.categories,
	});
	await note.save();
	res.status(201).json(note);
	console.log('createNote success: ' + note.id);
};

//responds with all notes
const getAllNotes = async (req, res) => {
	//supports search by (title and content) and category
	const search = regExpEscape(req.query.search || '');
	const categories = req.query.categories?.split(',') || [];
	console.log(categories);

	//object that defines mongoose query for title/content
	const queryObject = {
		$or: [
			{ title: { $regex: search, $options: 'i' } },
			{ content: { $regex: search, $options: 'i' } },
		],
	};
	//add category to query if specified
	if (categories.length > 0) {
		queryObject.categories = { $all: categories };
	}
	const query = Note.find(queryObject);

	const notes = await query;
	res.status(200).json(notes);
	console.log('getAllNotes success');
};

//responds with a note with the specified id
const getNote = async (req, res) => {
	const { id } = req.params;
	const note = await Note.findOne({ _id: id });
	if (note) {
		console.log('getNote success ' + note.id);
		return res.status(200).json(note);
	}
	console.log('getNote failed: no note with id ' + id);
	res.status(404).json({
		error: 'Note with the specified ID does not exists',
	});
};

//updates a note with the specified id
const updateNote = async (req, res) => {
	const { id } = req.params;
	const note = await Note.updateOne(
		{ _id: id },
		{ ...req.body, lastEditedAt: Date.now() }
	);
	if (note) {
		console.log('updateNote success ' + note.id);
		return res.status(200).json(note);
	}
	console.log('updateNote failed: no note with id ' + id);
	res.status(404).json({
		error: 'Note with the specified ID does not exists',
	});
};

//deletes a note with the specified id
const deleteNote = async (req, res) => {
	const { id } = req.params;
	const note = await Note.findByIdAndDelete(id);
	if (note) {
		console.log('deleteNote success ' + note.id);
		return res.status(200).json(note);
	}
	console.log('deleteNote failed: no note with id ' + id);
	res.status(404).json({
		error: 'Note with the specified ID does not exists',
	});
};

module.exports = {
	createNote,
	getAllNotes,
	getNote,
	updateNote,
	deleteNote,
};
