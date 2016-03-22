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
  mutationWithClientMutationId,
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

  let CustomGraphQLCreateStoryMutation = mutationWithClientMutationId({
    name: 'CreateStory',
    inputFields: {
      author: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      duration: { type: new GraphQLNonNull(GraphQLString) },
      genre: { type: new GraphQLNonNull(GraphQLString) },
      tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      story: { type: new GraphQLNonNull(GraphQLString) }
    },

    outputFields: {
      story: {
        type: CustomGraphQLStoryType,
        resolve: (object) => object.ops[0]
      }
    },

    mutateAndGetPayload: ({ author, title, duration, genre, tags, story }) => {
      return db.collection(COLLECTOION_NAME).insertOne({
        author,
        title,
        duration,
        genre,
        tags,
        story,
        stars: 0,
        timesRead: 0
      });
    }
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        store: {
          type: CustomGraphQLStoreType,
          resolve: () => store
        }
      })
    }),

    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        createStory: CustomGraphQLCreateStoryMutation
      })
    })
  });

  return schema;
};
