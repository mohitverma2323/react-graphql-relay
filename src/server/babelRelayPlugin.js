/* eslint-disable no-var */
// Relay uses a babel plugin to convert from Relay.QL string templates to JavaScript code that describes each query
// and includes data from the GraphQL schema.

// While you type queries as follows:

// Relay.QL`
//   fragment on User {
//     # ...
//   }
// `
// This gets converted into an immediately-invoked function:
//
// (function() {
//  // Return a description of the query ...
// })();

// babel-relay-plugin returns a function for creating plugin instances
var BabelRelayPlugin = require('babel-relay-plugin');

// load previously saved schema data (see genereteSchema.js so as to how to generate schema)
var schemaJSON = require('./data/schema.json');

// creating a plugin instance and exporting it
// (to be used in .babelrc so babel compiles the code using the plugin with the info from the generated schema)
module.exports = BabelRelayPlugin(schemaJSON.data);
