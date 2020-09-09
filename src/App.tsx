import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '@/history';
import CollapsePage from '@/pages/Collapse';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/collapse" component={CollapsePage} />
      </Switch>
    </Router>
  );
};

export default App;
