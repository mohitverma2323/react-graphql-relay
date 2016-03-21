/* eslint-disable no-console */
import fs from 'fs';
import express from 'express';
import GraphQLHTTP from 'express-graphql';
import { graphql, introspectionQuery } from 'graphql';

import DBOps from './src/server/db/db';
import Schema from './src/server/data/schema.js';

const PORT = 3000;
let app = express();

app.use(express.static('.'));

let schema = null;

(async () => {
  try {
    let db = await new DBOps().getConnection();

    schema = Schema(db);
    app.use('/graphql', GraphQLHTTP({
      schema,
      // enabling the graphiql interface (an IDE to run, test, introspect GraphQL queries)
      graphiql: true
    }));

    let schemaJSON = await graphql(schema, introspectionQuery);

    fs.writeFile('./src/server/data/schema.json', JSON.stringify(schemaJSON, null, 2), err => {
      if (err) {
        throw err;
      }
      console.log('successfully created schema');
    });

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (exception) {
    console.log(exception);
  }
})();
