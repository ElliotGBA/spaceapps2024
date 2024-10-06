import './App.css';
// import Orrery from "./Components/Orrery";
import "./classes/CelestialBody";
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AnimatedBackground } from 'animated-backgrounds';
// import { useNavigate } from "react-router-dom";
import "./scss/App.scss";

// import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";
import Home from "./components/Home";
import Intro from "./components/Intro";

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
        <main>
          {/* <Orrery /> */}
        </main>
      </div>
    )
  }
 

  return (
    <div className="App">
      <Router>
        <Routes>
        
          <Route path="/" element={<Intro />} />
          <Route path="/Home" element={<Home />} />
                  {/* intro page:<Route index path="/" element={<Placeholder/>}/> 
                  <Route path="/home" element={<Placeholder/>}/>
          <Route path="simulation" element={<Placeholder/>}/>
          <Route path="details:name" element={<Placeholder/>}/>
          <Route path="quiz:name" element={<Placeholder/>}/>
          {/*<Route path="extraInfo:name"/> */}
          {/*<Route path="*" element={<Placeholder/>}/> */}


        </Routes>
      </Router>
      </div>
    
 ) };


// function Home() {
//     const navigate = useNavigate();
//     const handleClick = () => {
//         navigate(".Components/Home");
//     };

//     return (
//       <div className="App">
//         <AnimatedBackground animationName="cosmicDust" />
//         <header className="App-header">
//             Welcome Youniversers!
//         </header>
//         <main>
//         <section id="content">
//           <p className="intro">
//             Imagine this: You are a NASA Astronaut exploring the Milky Way in a spaceship. 
//             You are tasked with exploring our solar system and getting information about it.
//             If you answer the call, you will be enlightened beyond what you can imagine.
//             <h3>ARE YOU READY TO ACCEPT THE CHALLENGE?</h3>
//           </p>
          
//           <motion.button whileHover={{ scale: 1.2 }}>Yes!</motion.button>
//           <motion.button whileHover={{ scale: 1.2 }}>Yes!</motion.button>
//         </section>
//         </main>
//       </div>
//     );
// }

// function App() {
//   const navigate = useNavigate();
//     const handleClick = () => {
//         navigate("/Home");
//     };
//   return(
//     <div>
//       <Routes>
//       <Route path="/" element={<Intro />} />
//       {/* <Home /> */}
//     </Routes>
//     <Home />
//     </div>
    
            // <div className="App">
            //   <div className="youniverse">
            //     <a href="" title="Back to Home Page">
            //       <img src="https://img.freepik.com/free-vector/cute-helmet-astronaut-space-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-7378.jpg" alt='astronaut'></img>
            //     </a>
            //     <h1>Welcome Youniversers!</h1>
            //   </div>
            //     <NavBar />
            //       <Routes>
            //             <Route path="/" element={<Intro />} />
            //             <Route path="/Home" element={<Home />} />
            //             {/* <Route path="/Gravity" element={<Gravity />} /> */}
            //             {/* <Route path="/More" element={<More />} /> */}
            //       </Routes>
            //       <Footer />
            // </div>
//   );
// }


export default App;

// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }
