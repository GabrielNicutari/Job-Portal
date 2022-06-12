const fs = require('fs');
const models_path = __dirname + '/models/mongo'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path + '/' + file);
})

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoUri = require('./database/mongoConfig');

// mongo routes
const mongoAuthRoutes = require('./routes/mongodb/authRoutes');
const mongoUserRoutes = require('./routes/mongodb/userRoutes');
const mongoApplicationRoutes = require('./routes/mongodb/applicationRoutes');

// mysql routes
const mysqlJobRoutes = require('./routes/mysql/jobRoutes');
// const mysqlUserRoutes = require('./routes/mysql/userRoutes');
const mysqlApplicationRoutes = require('./routes/mysql/applicationRoutes');
const mongoJobRoutes = require('./routes/mongodb/jobRoutes');

// neo4j routes
const neo4jApplicationRoutes = require('./routes/neo4j/applicationRoutes');
const neo4jJobRoutes = require('./routes/neo4j/jobRoutes');

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

app.use('/mysql', mysqlAuthRoutes);
app.use('/mongo', mongoAuthRoutes);

// app.use('/mysql', mysqlUserRoutes);
app.use('/mysql', mysqlJobRoutes);
app.use('/mysql', mysqlApplicationRoutes);

app.use('/mongo', mongoJobRoutes);
app.use('/mongo', mongoUserRoutes);
app.use('/neo4j', neo4jApplicationRoutes);
app.use('/neo4j', neo4jJobRoutes);
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
