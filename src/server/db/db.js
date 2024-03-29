import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://localhost/storyshotdb';

/**
 * This class takes care of the connection to the database.
 */
export default class DatabaseOperations {
  constructor() {
    this.db = null;
  }

  /**
   * Calls the provided callback function with the error or the database objct depending
   * on failure/success of the operation.
   *
   * @param  {Function} callback [the callback which will be called after the call to the db]
   * @return {null}            [null]
   */
  // something like the singleton design pattern
  async getConnection() {
    if (this.db) {
      return this.db;
    }

    let db = await MongoClient.connect(MONGO_URL);
    return db;
  }
}
