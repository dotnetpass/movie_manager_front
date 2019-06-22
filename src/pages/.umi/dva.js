import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  app.use(require('/Users/DuStark/git/moviemanager/node_modules/dva-immer/lib/index.js').default());
  app.model({ namespace: 'forum', ...(require('/Users/DuStark/git/moviemanager/src/models/forum.js').default) });
app.model({ namespace: 'idx', ...(require('/Users/DuStark/git/moviemanager/src/models/idx.js').default) });
app.model({ namespace: 'movie', ...(require('/Users/DuStark/git/moviemanager/src/models/movie.js').default) });
app.model({ namespace: 'user', ...(require('/Users/DuStark/git/moviemanager/src/models/user.js').default) });
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
