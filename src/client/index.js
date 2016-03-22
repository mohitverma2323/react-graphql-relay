import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {} from 'bootstrap-webpack';
import { RelayRouter } from 'react-router-relay';
import { Route, IndexRoute, browserHistory } from 'react-router';

import Main from './Components/Main';
import Home from './Components/Home';
import About from './Components/About';
import App from './Components/App';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// class HomeRoute extends Relay.Route {
//   static routeName = 'Home';
//   static queries = {
//     store: (Component) => Relay.QL`
//       query MainQuery {
//         store {
//           ${Component.getFragment('store')}
//         }
//       }
//     `
//   }
// }
//
// ReactDOM.render(
//   <Relay.RootContainer
//     Component={App}
//     route={new HomeRoute()} />,
//   document.getElementById('react')
// );

const StoryQueries = {
  store: (component) => Relay.QL`
    query MainQuery {
      store {
        ${component.getFragment('store')}
      }
    }
  `
};

let routes = (
    <Route component={Main} path='/' >
      <IndexRoute component={Home} />
      <Route component={App} path='app' queries={StoryQueries} />
      <Route component={About} path='about' />
    </Route>
);

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    { routes }
  </RelayRouter>,
  document.getElementById('react')
);
