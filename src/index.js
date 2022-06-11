require('./models/mongodb/User');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./database/mongoConfig');
const mongoAuthRoutes = require('./routes/mongodb/authRoutes');
const jobRoutes = require('./routes/mysql/jobRoutes');
const userRoutes = require('./routes/mysql/userRoutes');
const mySQLApplicationRoutes = require('./routes/mysql/applicationRoutes');
const neo4jApplicationRoutes = require('./routes/neo4j/applicationRoutes');
const neo4jJobRoutes = require('./routes/neo4j/jobRoutes');
const requireAuth = require('./middlewares/requireAuth');
const db = require('./models/mysql/dbAssociations');
const neo4jDriver = require('../src/database/neo4jConfig');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoAuthRoutes);
app.use(userRoutes);
app.use(jobRoutes);
app.use(mySQLApplicationRoutes);
app.use(neo4jApplicationRoutes);
app.use(neo4jJobRoutes);


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
    console.log('Connected to MySQL instance');

    const neo4jSession = neo4jDriver.session();
    console.log('Connected to neo4j instance');
    await neo4jSession.close();

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
