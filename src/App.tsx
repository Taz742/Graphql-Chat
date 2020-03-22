import React from 'react';
import {
  StyledMainLayout,
  StyledSidebarLayout,
  StyledMessagesLayout,
} from './css';

import {
  Switch,
  Route,
  useHistory,
  Redirect
} from 'react-router-dom';

import {
  Channels,
  Messages
} from './components';

import {
  UserContext
} from './contexts/';

const App: React.FC<any> = (props: any) => {
  return (
    <StyledMainLayout>
      <StyledSidebarLayout>
        <Channels />
        {/* <Channels /> */}
      </StyledSidebarLayout>
      <StyledMessagesLayout>
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={() => <div style={{padding: 20}}>Welcome! Please Select a Channel.</div>}
          />
          <Route path="/messages/:channelId" component={Messages} />
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </StyledMessagesLayout>
    </StyledMainLayout>
  )
};

export default App;
