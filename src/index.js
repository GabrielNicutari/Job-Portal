require('./models/User');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const requireAuth = require('./middlewares/requireAuth');
const MySQLConnector = require("./mysql.connector");

const connectToMysql = async () => {
    try {
        MySQLConnector.init();
        return await MySQLConnector.execute(`SELECT * FROM jobs;`, []);
    } catch (error) {
        console.error(
            "Error! ",
            typeof error === "object" ? JSON.stringify(error) : error
        );
    }
}

connectToMysql().then(r => console.log(r));

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(authRoutes);
//
// const user = process.env.MONGO_USERNAME;
// const password = process.env.MONGO_PASSWORD;
// const database = process.env.MONGO_DATABASE;
//
// const mongoUri = `mongodb+srv://${user}:${password}@cluster0.ejki7.mongodb.net/${database}?retryWrites=true&w=majority`;
//
// mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   //useCreateIndex: true,
//   useUnifiedTopology: true
// });
//
// mongoose.connection.on('connected', () => {
//   console.log('Connected to mongo instance');
// });
//
// app.get('/', requireAuth, (req, res) => {
//   console.log(req.user);
//   res.send(`Your email: ${req.user.email}`);
// });
//
// const PORT = process.env.PORT || 8080;
//
// app.listen(PORT, (error) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log('Server is running on port', Number(PORT));
// });
