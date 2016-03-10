import express from 'express';
import schema from './src/server/data/schema';
import GraphQLHTTP from 'express-graphql';
import DBOps from './src/server/db/db';

const PORT = 3000;
let app = express();

app.use(express.static('.'));

let db = null;

new DBOps().getConnection((error, database) => {
  if (error) {
    throw error;
  }

  db = database;
  app.use('/graphql', GraphQLHTTP({
    schema: schema(db),
    graphiql: true
  }));

  app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
  });
});
