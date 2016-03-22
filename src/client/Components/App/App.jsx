import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import MUI from 'material-ui';
const Colors = MUI.Styles.Colors;


import Story from './Story';

const RIBBON_HEIGHT = 50;

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
        <div style={{
          width: '100%',
          height: RIBBON_HEIGHT + 'vh',
          backgroundColor: Colors.blue700,
          WebkitFlexShrink: '0',
          MsFlexNegative: '0',
          flexShrink: '0'
        }}></div>
      <div style={{ marginTop: -(RIBBON_HEIGHT - 10) + 'vh' }}>
          { stories }
        </div>
      </div>
    );
  }
}

App = Relay.createContainer(App, {
  initialVariables: {
    limit: 1
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        storyConnection(last: $limit) {
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
