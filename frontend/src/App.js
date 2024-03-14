import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Upload from './pages/Upload';
import {Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      
      <Login/>
      <Upload/>

    </div>
  );
}

export default App;
