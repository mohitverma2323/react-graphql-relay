import React, { PropTypes } from 'react';
import { AppBar, IconButton } from 'material-ui';
import { MorphReplace } from 'react-svg-morph';
import { MdMenu, MdArrowBack } from 'react-icons/lib/md';

export default class Topbar extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired
  }

  render() {
    let leftIcon = (
      <IconButton
        onClick={this.props.toggleNav} >
        <MorphReplace width={24} height={24}>
          { this.props.open ? <MdArrowBack key='arrow-back' /> : <MdMenu key='menu' /> }
        </MorphReplace>
      </IconButton>
    );

    return (
      <header >
        <AppBar
          title='Story-Shot'
          iconElementLeft={ leftIcon }
          style={{ zIndex: 2000, position: 'fixed' }} />
      </header>
    );
  }
}
