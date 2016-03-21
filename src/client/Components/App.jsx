import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import Story from './Story';
/**
 * This class renders a div that has Hello World!! as it's text content
 */
class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    let stories = this.props.store.stories.map(story =>
      <Story key={story._id} story={story} />
    );

    return (
      <div>
        { stories }
      </div>
    );
  }
}

App = Relay.createContainer(App, {
  fragments: {
    store: () => Relay.QL`
    fragment on Store {
      stories {
        _id,
        ${Story.getFragment('story')}
      }
    }
    `
  }
});

export default App;
