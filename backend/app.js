const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware');
const connectDb = require('./db/connect');
const app = express();
const port = process.env.PORT || 3000;

const notesRouter = require('./routes/notes');
const categoriesRouter = require('./routes/categories');

const cors = require('cors');

//utils
app.use(cors());
app.use(bodyParser.json());

//router
app.use('/notes', notesRouter);
app.use('/categories', categoriesRouter);

//error handling using express-async-errors
app.use(errorMiddleware);

//init the app
const start = async () => {
	try {
		console.log('Connecting to database...');
		await connectDb();
		console.log('Connected to database.');
		app.listen(port, () => {
			console.log(`Example app listening at http://localhost:${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
