import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import { globalIdField, connectionArgs, mutationWithClientMutationId } from 'graphql-relay';

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

  let CustomGraphQLStoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      // relay global unique id generator
      id: globalIdField('Store'),
      story: {
        type: CustomGraphQLStoryType,
        args: connectionArgs,
        resolve: async () => {
          try {
            let max = await db.collection(COLLECTOION_NAME).count();
            let random = Math.floor(Math.random() * max);

            // this is like linear search. Can we do better?
            return await db.collection(COLLECTOION_NAME).find().limit(-1).skip(random).next();
          } catch (error) {
            throw error;
          }
        }
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
        // object.ops : array of all the documents inserted.
        resolve: (object) => object.ops[0]
      },
      store: {
        type: CustomGraphQLStoreType,
        resolve: () => store
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
