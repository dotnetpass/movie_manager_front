import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import history from '@tmp/history';


const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default
      },
      {
        "path": "/exception/403",
        "exact": true,
        "component": require('../exception/403.js').default
      },
      {
        "path": "/exception/404",
        "exact": true,
        "component": require('../exception/404.js').default
      },
      {
        "path": "/exception/500",
        "exact": true,
        "component": require('../exception/500.js').default
      },
      {
        "path": "/forum/my",
        "exact": true,
        "component": require('../forum/my.js').default
      },
      {
        "path": "/forum/new",
        "exact": true,
        "component": require('../forum/new.js').default
      },
      {
        "path": "/forum/:id",
        "exact": true,
        "component": require('../forum/$id.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('../login.js').default
      },
      {
        "path": "/movie/list",
        "exact": true,
        "component": require('../movie/list.js').default
      },
      {
        "path": "/movie/my",
        "exact": true,
        "component": require('../movie/my.js').default
      },
      {
        "path": "/movie/:id",
        "exact": true,
        "component": require('../movie/$id.js').default
      },
      {
        "path": "/register",
        "exact": true,
        "component": require('../register.js').default
      },
      {
        "component": () => React.createElement(require('/Users/DuStark/git/moviemanager/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/DuStark/git/moviemanager/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper() {
  return (
<Router history={history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
