import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { COLLECTOION_NAME } from '../../Constants';

module.exports = (db) => {
  let linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
      _id: { type: GraphQLString },
      name: { type: GraphQLString },
      desc: { type: GraphQLString }
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        links: {
          type: new GraphQLList(linkType),
          resolve: () => db.collection(COLLECTOION_NAME).find({}).toArray()
        }
      })
    })
  });

  return schema;
};
