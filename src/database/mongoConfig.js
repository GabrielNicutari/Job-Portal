require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});
const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ejki7.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
module.exports = mongoUri;
