import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { AppBar, LeftNav, MenuItem, IconButton } from 'material-ui';
import { MorphReplace } from 'react-svg-morph';
import { MdMenu, MdArrowBack } from 'react-icons/lib/md';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';


// import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './theme.js';


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
    let leftIcon = (
      <IconButton
        onClick={ () => {
          this.setState({ open: !this.state.open });
        }} >
        <MorphReplace width={24} height={24}>
          { this.state.open ? <MdArrowBack key='arrow-back' /> : <MdMenu key='menu' /> }
        </MorphReplace>
      </IconButton>
    );

    return (
      <div>
        <LeftNav open={this.state.open}>
          <AppBar />
          <Link to='app'><MenuItem>App</MenuItem></Link>
          <Link to='about'><MenuItem>About</MenuItem></Link>
        </LeftNav>
        <AppBar
          title='Story-Shot'
          iconElementLeft={ leftIcon }
          style={{ zIndex: 2000 }}
          onLeftIconButtonTouchTap={() => {
            this.setState({ open: !this.state.open });
          }} />
        { this.props.children }
      </div>
    );
  }
}
