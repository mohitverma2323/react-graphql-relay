import Relay from 'react-relay';

class CreateStoryMutation extends Relay.Mutation {
  // This method returns a GraphQL operation that represents the mutation to be performed.
  // This presumes that the server implements a mutation type named ‘createStory’
  getMutation() {
    return Relay.QL`
      mutation {
        createStory
      }
    `;
  }

  // This method to prepares the variables that will be used as input to the mutation.
  // Our ‘createStory’ mutation takes exactly six variables as input.
  getVariables() {
    return {
      title: this.props.title,
      author: this.props.author,
      tags: this.props.tags,
      duration: this.props.duration,
      genre: this.props.genre,
      story: this.props.story
    };
  }

  // This method designs a ‘fat query’ – one that represents every field in our data model that could change as a
  // result of this mutation. Relay will intersect this query with a ‘tracked query’ that represents the data that our
  // application actually uses, and instruct the server to include only those fields in its response.
  getFatQuery() {
    return Relay.QL`
      fragment on CreateStoryPayload {
         store {
           story
         }
      }
    `;
  }

  // These configurations advise Relay on how to handle the createStoryPayload returned by the server.
  getConfigs() {
    return [ ];
  }
}

export default CreateStoryMutation;
