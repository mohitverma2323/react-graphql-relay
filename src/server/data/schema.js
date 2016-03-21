import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
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
      _id: { type: GraphQLString },
      author: { type: GraphQLString },
      title: { type: GraphQLString },
      duration: { type: GraphQLString },
      genre: { type: GraphQLString },
      tags: { type: new GraphQLList(GraphQLString) },
      story: { type: GraphQLString }
    })
  });

  let CustomGraphQLStoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      stories: {
        type: new GraphQLList(CustomGraphQLStoryType),
        resolve: () => db.collection(COLLECTOION_NAME).find({}).toArray()
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
