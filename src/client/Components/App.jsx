import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { AppBar } from 'material-ui';

import Story from './Story';

/**
 * This class renders a div that has Hello World!! as it's text content
 */
class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    let stories = this.props.store.storyConnection.edges.map(edge =>
      <Story key={edge.node.id} story={edge.node} />
    );

    return (
      <div>
        <AppBar title='Story-Shot' />
        { stories }
      </div>
    );
  }
}

App = Relay.createContainer(App, {
  initialVariables: {
    limit: 3
  },
  fragments: {
    store: () => Relay.QL`
    fragment on Store {
      storyConnection(first: $limit) {
        edges {
          node {
            id,
            ${Story.getFragment('story')}
          }
        }
      }
    }
    `
  }
});

export default App;
