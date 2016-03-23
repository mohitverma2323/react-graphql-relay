/* eslint-disable no-console */
import fs from 'fs';
import { graphql, introspectionQuery } from 'graphql';

import DBOps from './db/db';
import Schema from './data/schema.js';

/** Generates the schema required by relay (needs to run if there is a change to schema) */
(async () => {
  try {
    let db = await new DBOps().getConnection();
    let schema = Schema(db);

    let schemaJSON = await graphql(schema, introspectionQuery);

    fs.writeFile('./src/server/data/schema.json', JSON.stringify(schemaJSON, null, 2), err => {
      if (err) {
        throw err;
      }
      console.log('successfully created schema');
    });
  } catch (exception) {
    console.log(exception);
  }
})();
