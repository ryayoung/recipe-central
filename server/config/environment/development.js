/*eslint no-process-env:0*/

import _ from 'lodash';

let localConfig;
try {
  localConfig = require('./local.js');
} catch(err) {
  localConfig = {};
}

// Development specific configuration
// ==================================
module.exports = _.merge(
    {
    // MongoDB connection options
    mongo: {
        useMongoClient: true,
        uri: process.env.MONGODB_URI || 'mongodb://web2-mongodb/web2-ryayoung'
    },
    // Seed database on startup
        seedDB: true
    },
  localConfig);




        // uri: process.env.MONGODB_URI || 'mongodb://web2-mongodb/web2-template-dev'
//
// mongodb+srv://web2user:web2pass@web2.l38pv.mongodb.net/web2-ryayoung?retryWrites=true&w=majority
