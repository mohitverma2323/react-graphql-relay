/* eslint-disable no-console */
import express from 'express';
import GraphQLHTTP from 'express-graphql';

import DBOps from './src/server/db/db';
import Schema from './src/server/data/schema.js';

const PORT = 3000;
let app = express();

app.use(express.static('.'));

(async () => {
  try {
    let db = await new DBOps().getConnection();
    let schema = Schema(db);

    app.use('/graphql', GraphQLHTTP({
      schema,
      // enabling the graphiql interface (an IDE to run, test, introspect GraphQL queries)
      graphiql: true
    }));

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (exception) {
    console.log(exception);
  }
})();
