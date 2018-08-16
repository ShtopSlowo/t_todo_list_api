const mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('MongoDBAtlas');

const connectionString = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@cluster0-0gwjo.mongodb.net/test?retryWrites=true`;

mongoose.connect(connectionString, { useNewUrlParser: true });

module.exports = mongoose;
