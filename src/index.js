require('./models/mongodb/User');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const requireAuth = require('./middlewares/requireAuth');
const db = require('./models/mysql/dbAssociations');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(userRoutes);
app.use(jobRoutes)
app.use(applicationRoutes);

const user = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const database = process.env.MONGO_DATABASE;

const mongoUri = `mongodb+srv://${user}:${password}@cluster0.ejki7.mongodb.net/${database}?retryWrites=true&w=majority`;

(initApp = async () => {
  try {
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      //useCreateIndex: true,
      useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
      console.log('Connected to mongo instance');
    });

    app.get('/', requireAuth, (req, res) => {
      console.log(req.user);
      res.send(`Your email: ${req.user.email}`);
    });

    const PORT = process.env.PORT || 8080;

    console.log('Testing mysql connection..');
    await db.authenticate();
    console.log('Connection to mysql established successfully.');

    app.listen(PORT, (error) => {
      if (error) {
        console.log(error);
      }
      console.log('Server is running on port', Number(PORT));
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.original);
  }
})();
