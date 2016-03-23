import React from 'react';
import { Link } from 'react-router';
import { FloatingActionButton } from 'material-ui';
import { MdAcUnit } from 'react-icons/lib/md';

export default class FAB extends React.Component {

  render() {
    let styles = {
      position: 'fixed',
      display: 'block',
      right: 0,
      bottom: 0,
      marginRight: 40,
      marginBottom: 40,
      zIndex: 900
    };

    return (
      <Link to='a-random-shot'>
        <FloatingActionButton style={styles}>
          <MdAcUnit />
        </FloatingActionButton>
      </Link>
    );
  }
}
