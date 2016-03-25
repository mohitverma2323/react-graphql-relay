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
   * A custom GraphQLObjectType representing the Story data type
   */
  let CustomGraphQLStoryType = new GraphQLObjectType({
    name: 'Story',
    fields: () => ({
      // id required by relay (just a wrapper around mongodb's _id)
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (object) => object._id
      },
      // all the fields seem self-descriptive default reslotion will happen here
      author: { type: GraphQLString },
      title: { type: GraphQLString },
      duration: { type: GraphQLString },
      genre: { type: GraphQLString },
      tags: { type: new GraphQLList(GraphQLString) },
      story: { type: GraphQLString }
    })
  });

  /**
   * A custom GraphQLObjectType. It's like a collection of CustomGraphQLStoryType.
   */
  let CustomGraphQLStoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      // relay global unique id generator helper to well generate unique global id's
      id: globalIdField('Store'),
      story: {
        type: CustomGraphQLStoryType,
        // hmmm ?
        args: connectionArgs,
        // how to resolve a query to fetch a story
        // any custom js code can be shoved here
        resolve: async () => {
          try {
            // The following logic is to get a random document from the mongodb.
            // getting the count then generating a random number in the range
            let max = await db.collection(COLLECTOION_NAME).count();
            let random = Math.floor(Math.random() * max);

            // getting the document at position $random
            // this is like linear search. Can we do better?
            return await db.collection(COLLECTOION_NAME).find().limit(-1).skip(random).next();
          } catch (error) {
            throw error;
          }
        }
      }
    })
  });

  /**
   * Relay compatible mutation object. (Relay mutations only allow single input field therefore they
   * have unique ids)
   */
  let CustomGraphQLCreateStoryMutation = mutationWithClientMutationId({
    name: 'CreateStory',
    // input to mutateAndGetPayload. Values expected from the client.
    inputFields: {
      author: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      duration: { type: new GraphQLNonNull(GraphQLString) },
      genre: { type: new GraphQLNonNull(GraphQLString) },
      tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      story: { type: new GraphQLNonNull(GraphQLString) }
    },

    // the query to run after the mutation is done with. Can be arbitrary and not just bound by
    // the mutation that just took place.
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

    // mutation logic goes here(any arbitrary logic)
    // notice the return is a promise (relay nativly supports it. COOL huh)
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

  // The schema for our app it's like the topmost level will have two keys/attrs/fields/whatever
  // 1. query 2. mutation
  let schema = new GraphQLSchema({
    // wrapper for all the queries
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        store: {
          type: CustomGraphQLStoreType,
          resolve: () => store
        }
      })
    }),

    // wrapper for all the mutations
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        createStory: CustomGraphQLCreateStoryMutation
      })
    })
  });

  return schema;
};
