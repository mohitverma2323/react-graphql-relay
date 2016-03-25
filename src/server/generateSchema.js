/* eslint-disable no-console */
import fs from 'fs';
import { graphql, introspectionQuery } from 'graphql';

import DBOps from './db/db';
import Schema from './data/schema.js';

/**
 ^ The babel-relay-plugin needs to understand the schema that we use, which is generated using graphql
 * Save JSON of full schema introspection for Babel Relay Plugin to use
 *
 * @return {null} [nothing]
 */
// NOTE: should this be an iffe?
let schemaGenerator = async () => {
  try {
    // a db connection is required by the schema.js file
    let db = await new DBOps().getConnection();
    let schema = Schema(db);

    // using ES7 async-await here.(awesome right?)
    let schemaJSON = await graphql(schema, introspectionQuery);

    // just writing it to a file using node's fs Module
    // NOTE: the callback can be eliminated here
    fs.writeFile('./src/server/data/schema.json', JSON.stringify(schemaJSON, null, 2), err => {
      if (err) {
        throw err;
      }
      console.log('successfully created schema');
    });
  } catch (exception) {
    console.log(exception);
  }
};

export default schemaGenerator;
