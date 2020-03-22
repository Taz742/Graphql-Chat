import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { client } from './apollo';
import { GlobalStyles } from './css';
import { UserContextProvider, UserContext } from './contexts/';
import { Login } from './components';

const PrivateRoute: any = (props: any) => {
  const { state } = React.useContext(UserContext);
  const component = state.isLoggedIn ? props.component : () => <Redirect to="/login" />;

  return (
    <Route {...props} component={component} />
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyles />
    <Router>
      <UserContextProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="*" component={App} />
        </Switch>
      </UserContextProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
