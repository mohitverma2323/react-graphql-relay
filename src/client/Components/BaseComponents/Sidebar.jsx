import React, { PropTypes } from 'react';
import { AppBar, LeftNav, MenuItem } from 'material-ui';
import { Link } from 'react-router';
import { MdLocalBar, MdAdd, MdPersonOutline } from 'react-icons/lib/md';

class SidebarItem extends React.Component {

  static propTypes = {
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired
  };

  render() {
    return (
      <Link to={this.props.link}>
        <MenuItem primaryText={this.props.name}
          leftIcon={this.props.icon} />
      </Link>
    );
  }
}

export default class Sidebar extends React.Component {

  static propTypes = {
    open: PropTypes.bool.isRequired
  }

  render() {
    return (
      <LeftNav open={this.props.open}>
        <AppBar />
        <SidebarItem icon={<MdLocalBar />} link={'a-random-shot'} name={'A Random Shot'} />
        <SidebarItem icon={<MdAdd />} link={'add-shot'} name={'Add New Shot'} />
        <SidebarItem icon={<MdPersonOutline />} link={'about'} name={'About'} />
      </LeftNav>
    );
  }
}
