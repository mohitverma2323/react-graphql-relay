import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import App from './Components/App';

class HomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL`
      query MainQuery {
        store {
          ${Component.getFragment('store')}
        }
      }
    `
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new HomeRoute()} />,
  document.getElementById('react')
);
