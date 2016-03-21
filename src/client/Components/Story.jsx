import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = { };

  static propTypes = {
    story: PropTypes.object.isRequired
  };

  render() {
    let { story } = this.props;

    return (
      <div>
        <p>{story.story}</p>
        <h2>{story.author}</h2>
      </div>
    );
  }
}

Story = Relay.createContainer(Story, {
  fragments: {
    story: () => Relay.QL`
      fragment on Story {
        story,
        author
      }
    `
  }
});

export default Story;
