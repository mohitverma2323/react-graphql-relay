import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';

import { COLLECTOION_NAME } from '../../Constants';

/**
 * Sets up the schema for the GraphQL querries
 *
 * @param  {Object} db [Takes in the DB Connection object]
 * @return {Object} schema  [The schema for GraphQL qerries]
 */
module.exports = (db) => {
  let store = {};
  /**
   * A custom GraphQLObjectType representing the link data type
   */
  let CustomGraphQLStoryType = new GraphQLObjectType({
    name: 'Story',
    fields: () => ({
      // id required by relay (just a wrapper around mongodb's _id)
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (object) => object._id
      },
      author: { type: GraphQLString },
      title: { type: GraphQLString },
      duration: { type: GraphQLString },
      genre: { type: GraphQLString },
      tags: { type: new GraphQLList(GraphQLString) },
      story: { type: GraphQLString }
    })
  });

  let CustomGraphQLStoryConnection = connectionDefinitions({
    name: 'Story',
    nodeType: CustomGraphQLStoryType
  });

  let CustomGraphQLStoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      storyConnection: {
        type: CustomGraphQLStoryConnection.connectionType,
        args: connectionArgs,
        resolve: (_, args) => connectionFromPromisedArray(db.collection(COLLECTOION_NAME).find({}).toArray(), args)
      }
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () =>({
        store: {
          type: CustomGraphQLStoreType,
          resolve: () => store
        }
      })
    })
  });

  return schema;
};
