//custom error handling middleware
module.exports = (err, req, res, next) => {
	console.log('Error:' + err);
	res.status(500).json({ Error: err.message });
};
