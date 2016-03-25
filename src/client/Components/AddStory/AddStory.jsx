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

  // returns the duratoin based on the word count of the story
  // server expects it from the client
  __getDuration__ = (length) => {
    if (length < SHORT_LENGTH) {
      return 'short';
    } else if (length < LONG_LENGTH) {
      return 'medium';
    }
    return 'long';
  }

  /**
   * What to do when a valid form submission takes place
   * @param  {object}   model    [ all the details we need to send to the server regarding a story ]
   * @param  {Function} callback [ just a function that will reset the form ]
   * @return {null}            [ nothing ]
   */
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

// hmm..
AddStory = Relay.createContainer(AddStory, {
  // You can compose a mutation's query fragments like you would those of any other RelayContainer.
  // This ensures that the data depended upon by the mutation will be fetched and ready for use.
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        story {
          id
        }
      }
    `
  }
});

export default AddStory;
