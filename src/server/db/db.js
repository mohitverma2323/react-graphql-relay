import { MongoClient } from 'mongodb';

const MONGO_URL = '';

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
  getConnection(callback) {
    if (this.db) {
      callback(null, this.db);
    }
    MongoClient.connect(MONGO_URL, (error, database) => {
      if (error) {
        callback(error);
      }
      this.db = database;
      callback(null, database);
    });
  }
}
