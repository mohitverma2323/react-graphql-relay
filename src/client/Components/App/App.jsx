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
    let story = this.props.store.story;

    return (
      <div style={{ marginBottom: 50 }}>
        <div style={{
          width: '100%',
          height: RIBBON_HEIGHT + 'vh',
          backgroundColor: Colors.blue700,
          WebkitFlexShrink: '0',
          MsFlexNegative: '0',
          flexShrink: '0'
        }}></div>
      <div style={{ marginTop: -(RIBBON_HEIGHT - 10) + 'vh' }}>
        <Story key={story.id} story={story} />
        </div>
      </div>
    );
  }
}

App = Relay.createContainer(App, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        story {
          id,
          ${Story.getFragment('story')}
        }
      }
    `
  }
});

export default App;
