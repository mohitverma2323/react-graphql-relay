import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import MyRawTheme from './theme';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const NAVBAR_HEIGHT = 64;

export default class Main extends React.Component {
  state = {
    open: false
  };

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  // the key passed through context must be called "muiTheme"
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme)
    };
  }

  render() {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Topbar open={this.state.open} toggleNav={() => {
          this.setState({ open: !this.state.open });
        }} />
        <Sidebar open={this.state.open}/>
        <div style={{ flex: 1, paddingTop: NAVBAR_HEIGHT }}>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}
