require('dotenv').config();
const express = require('express');
const jobRoutes = require('./routes/mysql/jobRoutes');
const userRoutes = require('./routes/mysql/userRoutes');
const mySQLApplicationRoutes = require('./routes/mysql/applicationRoutes');
const requireAuth = require('./middlewares/requireAuth');
const db = require('./models/mysql/dbAssociations');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(jobRoutes);
app.use(mySQLApplicationRoutes);

(initApp = async () => {
  try {
    app.get('/', requireAuth, (req, res) => {
      console.log(req.user);
      res.send(`Your email: ${req.user.email}`);
    });

    const PORT = process.env.PORT || 8080;

    console.log('Testing mysql connection..');
    await db.authenticate();
    console.log('Connected to MySQL instance');

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
