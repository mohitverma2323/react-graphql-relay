import React from 'react';
import Relay from 'react-relay';
import { Route, IndexRoute } from 'react-router';

import Main from './BaseComponents/Main';
import Home from './Dashboard/Home';
import About from './AboutPage/About';
import App from './App/App';
import AddStory from './AddStory/AddStory';


/**
 * Top level query information for the App component
 * @type {Object}
 */
const StoryQueries = {
  store: (component) => Relay.QL`
    query MainQuery {
      store {
        ${component.getFragment('store')}
      }
    }
  `
};

/**
 * All the routes in the application. The top level route is always rendered and depending on suffix
 * to the main address one of it's children are rendered.
 *
 *  IndexRoute: the react component to render on '/'.
 *  Route: react component to render on '/<path>'
 */
let routes = (
    <Route component={Main} path='/' >
      <IndexRoute component={Home} />
      <Route component={App} path='a-random-shot' queries={StoryQueries} />
      <Route component={AddStory} path='add-shot' />
      <Route component={About} path='about' />
    </Route>
);

export default routes;
