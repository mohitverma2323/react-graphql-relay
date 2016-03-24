import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import MUI from 'material-ui';
const Colors = MUI.Styles.Colors;

import CreateStoryMutation from './CreateStoryMutation';
import FormAddStory from './FormAddStory';

const SHORT_LENGTH = 500;
const LONG_LENGTH = 1000;
const RIBBON_HEIGHT = 50;

class AddStory extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  __getDuration__ = (length) => {
    if (length < SHORT_LENGTH) {
      return 'short';
    } else if (length < LONG_LENGTH) {
      return 'medium';
    }
    return 'long';
  }

  onSubmit = (model, callback) => {
    model.duration = this.__getDuration__(model.story.length);
    model.store = this.props.store;
    Relay.Store.update(new CreateStoryMutation(model));
    callback();
  };

  render() {
    return (
      <div className='text-center'>
        <div style={{
          width: '100%',
          height: RIBBON_HEIGHT + 'vh',
          backgroundColor: Colors.blue700,
          WebkitFlexShrink: '0',
          MsFlexNegative: '0',
          flexShrink: '0'
        }}></div>
        <div style={{ marginTop: -(RIBBON_HEIGHT - 10) + 'vh' }}>
          <FormAddStory onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

AddStory = Relay.createContainer(AddStory, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id
      }
    `
  }
});

export default AddStory;
