import React, { PropTypes } from 'react';
import { AppBar, LeftNav, MenuItem } from 'material-ui';
import { Link } from 'react-router';

export default class Sidebar extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired
  }

  render() {
    return (
        <LeftNav open={this.props.open}>
          <AppBar />
          <Link to='app'><MenuItem>App</MenuItem></Link>
          <Link to='about'><MenuItem>About</MenuItem></Link>
        </LeftNav>
    );
  }
}
