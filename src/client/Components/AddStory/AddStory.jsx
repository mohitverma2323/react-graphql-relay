import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class AddStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {

  };

  static propTypes = {

  };

  render() {
    return (
      <div className='text-center'>
        <h1>Add a new story</h1>
      </div>
    );
  }
}
//
// AddStory = Relay.createContainer(AddStory, {
//   fragments: {
//     AddStory: () => Relay.QL`
//       fragment on  {
//       }
//     `
//   }
// });
//
export default AddStory;
