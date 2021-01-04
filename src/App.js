import './App.css';
import PeepList from './components/PeepList/PeepList.js'
import Navbar from './components/Navbar/Navbar.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>This is the app div</h1>
      <PeepList />
    </div>
  );
}

export default App;
