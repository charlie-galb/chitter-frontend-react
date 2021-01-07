import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Timeline from './components/Timeline/Timeline.js';
import Home from './components/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import SignupForm from './components/SignupForm/SignupForm.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/timeline' component={Timeline} />
          <Route path='/sign_up' component={SignupForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
