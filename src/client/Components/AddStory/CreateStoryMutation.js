import Relay from 'react-relay';

class CreateStoryMutation extends Relay.Mutation {
  // GraphQL operation for the mutation
  getMutation() {
    return Relay.QL`
      mutation {
        createStory
      }
    `;
  }

  // preping up the variables required for the mutation
  // all the values available in the props object
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

  // Everything in the data model that could be affected by running the mutation.
  // Relay intersects the actual data with it and only askes for that.
  getFatQuery() {
    return Relay.QL`
      fragment on CreateStoryPayload {
         store {
           story
         }
      }
    `;
  }

  // An array of configurations.
  getConfigs() {
    return [ ];
  }
}

export default CreateStoryMutation;
