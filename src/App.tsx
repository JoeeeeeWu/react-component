import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '@/history';
import CollapsePage from '@/pages/Collapse';
import TransitionPage from '@/pages/Transition';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/collapse" component={CollapsePage} />
        <Route path="/transition" component={TransitionPage} />
      </Switch>
    </Router>
  );
};

export default App;
