require('dotenv').config();
const express = require('express');

//const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', requireAuth, (req, res) => {
// 	console.log(req.user);
// 	res.send(`Your email: ${req.user.email}`);
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
	if (error) {
		console.log(error);
	}
	console.log('Server is running on port', Number(PORT));
});
