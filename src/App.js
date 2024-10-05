import './App.css';
import "./classes/CelestialBody";
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';

import { CelestialBody } from './classes/CelestialBody';

function App() {

  const sun = new CelestialBody("Sun", 420, 69)

  return (
    
    <div className="App">
      
    </div>
  );

}

export default App;
