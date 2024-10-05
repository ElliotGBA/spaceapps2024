import './App.css';
import "./classes/CelestialBody";
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';

import { CelestialBody } from './classes/CelestialBody';

function App() {

  //const sun = new CelestialBody("Sun", 420, 69)
/**
 * Pages:
 * 
 * intro page
 * homepage (orrery)
 * interactive page
 * learn more (planet)
 * quiz page
 * maybe (learn even more)
 */

  // temp component for routing, replace with actual ones:
  const Placeholder = () => {
    return(
      <div>
        This is a place holder :) 
      </div>
    )
  }
 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
        {/* intro page:*/}<Route index path="/" element={<Placeholder/>}/> 
          <Route path="/home" element={<Placeholder/>}/>
          <Route path="simulation" element={<Placeholder/>}/>
          <Route path="details:name" element={<Placeholder/>}/>
          <Route path="quiz:name" element={<Placeholder/>}/>
          {/*<Route path="extraInfo:name"/> */}
          <Route path="*" element={<Placeholder/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
