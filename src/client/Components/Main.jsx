import React, { PropTypes } from 'react';
import { AppBar } from 'material-ui';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {

  };

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <AppBar title='Story-Shot' style={{ zIndex: 10 }} />
        { this.props.children }
      </div>
    );
  }
}
