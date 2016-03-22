import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui';
import Relay from 'react-relay';

class Story extends React.Component {

  static propTypes = {
    story: PropTypes.object.isRequired
  };

  render() {
    let { story } = this.props;
    let storyMarkup = story.story.split('\n').map((line, index) => <p key={index}>{line}</p>);

    return (
      <div className='container'>
        <br />
        <Card className='span12'>
          <CardTitle
            subtitle={ `by ${story.author}`}
            title={story.title}
            style={{ padding: 50, paddingBottom: 0 }} />
          <CardText style={{ padding: 50 }}> { storyMarkup } </CardText>
        </Card>
        <br />
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
