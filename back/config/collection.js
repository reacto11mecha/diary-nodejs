const Datastore = require('nedb');
const path = require('path');

const env = require('dotenv').config(path.join(path.resolve(), '.env')).parsed;

module.exports = {
    User: new Datastore({ autoload: true, filename: path.join(path.resolve(), 'collection', env.C_U) }),
    Diary: new Datastore({ autoload: true, filename: path.join(path.resolve(), 'collection', env.C_Dr) })
}