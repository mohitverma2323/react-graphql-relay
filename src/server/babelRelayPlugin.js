var BabelRelayPlugin = require('babel-relay-plugin');
var schemaJSON = require('./data/schema.json');

module.exports = BabelRelayPlugin(schemaJSON.data);
