import React from 'react'
import './App.css';
import SongCompiler from './components/SongCompiler'
import { BrowserRouter as Router} from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <SongCompiler />
      </Router>
    </>
  );
}

export default App;
