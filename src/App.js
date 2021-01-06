import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Timeline from './components/Timeline/Timeline.js'
import Home from './components/Home/Home.js'
import Navbar from './components/Navbar/Navbar.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route path='/timeline' component={Timeline} />
      </div>
    </Router>
  );
}

export default App;
