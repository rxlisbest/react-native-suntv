import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
  Redirect
} from 'react-router'

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={base.app} onEnter={isLogin}>
      <Route path="/view" component="@/component/view" />
    </Route>
  </Router>
)