'use strict';

module.exports = {
  db: {
    uri: process.env.MONGO_URL,
    options: {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD
    }
  }
};