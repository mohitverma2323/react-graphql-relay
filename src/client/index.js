import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {} from 'bootstrap-webpack';
import { RelayRouter } from 'react-router-relay';
import { browserHistory } from 'react-router';

import routes from './Components/Routes.jsx';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    { routes }
  </RelayRouter>,
  document.getElementById('react')
);
