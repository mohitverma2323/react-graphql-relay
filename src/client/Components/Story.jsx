import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class Story extends React.Component {

  static propTypes = {
    story: PropTypes.object.isRequired
  };

  render() {
    let { story } = this.props;

    return (
      <div className='container'>
        <div className='span12'>
          <h2>{story.title}</h2>
          <p>{story.story}</p>
          <p className='text-right'>
            <i>{`-- A shot by ${story.author}`}</i>
          </p>
        </div>
      </div>
    );
  }
}

Story = Relay.createContainer(Story, {
  fragments: {
    story: () => Relay.QL`
      fragment on Story {
        title,
        story,
        author
      }
    `
  }
});

export default Story;
