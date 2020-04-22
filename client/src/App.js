import React from 'react';
import ChatPage from './components/ChatPage/ChatPage';
import HomePage from './components/HomePage/HomePage';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/chat" component={ChatPage} />
    </Switch>
  );
}

export default App;
