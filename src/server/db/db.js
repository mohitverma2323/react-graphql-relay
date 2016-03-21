import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://shinigami:shinigami@ds019708.mlab.com:19708/ddrgrappdb';

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
  async getConnection() {
    if (this.db) {
      return this.db;
    }

    let db = await MongoClient.connect(MONGO_URL);
    return db;
  }
}
