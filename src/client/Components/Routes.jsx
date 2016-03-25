import React from 'react';
import Relay from 'react-relay';
import { Route, IndexRoute } from 'react-router';

import Main from './BaseComponents/Main';
import Home from './Dashboard/Home';
import About from './AboutPage/About';
import App from './App/App';
import AddStory from './AddStory/AddStory';

// Since Relay containers define fragments and not queries, they can be easily embedded in multiple contexts.
// Like React components, Relay containers are highly reusable.
// Routes are objects that define a set of root queries and input parameters
// Therefor we require this top level query

/**
 * Top level query information for the App component as well as the AddStory component
 * (Sholud change in the near future).
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
      <Route component={AddStory} path='add-shot' queries={StoryQueries} />
      <Route component={About} path='about' />
    </Route>
);

export default routes;
