import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
