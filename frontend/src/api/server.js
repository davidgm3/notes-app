// returns all notes
export const getAllNotes = async (search = '', categories = []) => {
	const url = import.meta.env.VITE_SERVER_URL;

	//if categories is set, add it to the query string
	const catStr =
		categories.length > 0 ? `&categories=${categories.join(',')}` : '';
	//fetch notes from the backend
	const response = await fetch(`${url}/notes?search=${search}${catStr}`);
	console.log(`${url}/notes?search=${search}${catStr}`);

	const json = await response.json();
	return json;
};

//creates note from object
export const createNote = async (note) => {
	const url = import.meta.env.VITE_SERVER_URL;
	const response = await fetch(`${url}/notes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	});
	const json = await response.json();
	return json;
};

//gets note with specified id
export const getNote = async (id) => {
	const url = import.meta.env.VITE_SERVER_URL;
	const response = await fetch(`${url}/notes/${id}`);
	const json = await response.json();
	return json;
};

//updates note with specified id, given an object
export const updateNote = async (id, note) => {
	const url = import.meta.env.VITE_SERVER_URL;
	const response = await fetch(`${url}/notes/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	});
	const json = await response.json();
	return json;
};

//deletes note with specified id
export const deleteNote = async (id) => {
	const url = import.meta.env.VITE_SERVER_URL;
	const response = await fetch(`${url}/notes/${id}`, {
		method: 'DELETE',
	});
	const json = await response.json();
	return json;
};

//gets all categories
export const getAllCategories = async () => {
	const url = import.meta.env.VITE_SERVER_URL;
	const response = await fetch(`${url}/categories`);
	const json = await response.json();
	return json;
};

//creates category
export const createCategory = async (category) => {
	const url = import.meta.env.VITE_SERVER_URL;
	const response = await fetch(`${url}/categories`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(category),
	});
	const json = await response.json();
	return json;
};
