import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import UserContextProvider from './contexts/UserContext.js';
import Timeline from './components/Timeline/Timeline.js';
import Home from './components/Home/Home.js';
import SignupPage from './components/SignupPage/SignupPage.js';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/timeline' component={Timeline} />
            <Route path='/sign_up' component={SignupPage} />
          </Switch>
        </div>
      </UserContextProvider>
    </Router>
  );
}

export default App;
