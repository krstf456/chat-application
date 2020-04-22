import React from 'react';
import Chat from './components/Chat/Chat';
import HomePage from './components/HomePage/HomePage';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
}

export default App;
