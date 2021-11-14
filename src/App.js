import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { insertDefaultDB } from './database';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import routes from './config/routes';
import AuthRoute from './components/AuthRoute';

function App() {
  /**
   * Set default database (Localstorage) if null
   */
  useEffect(() => {
    insertDefaultDB();
  }, []);

  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          if (route.auth) {
            return (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                render={(routeProps) => (
                  <AuthRoute>
                    <route.component {...routeProps} />
                  </AuthRoute>
                )}
              />
            );
          }
          return (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              render={(routeProps) => <route.component {...routeProps} />}
            />
          );
        })}
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
