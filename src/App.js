import React from "react";
import { motion } from "framer-motion";
import { AnimatedBackground } from 'animated-backgrounds';
import "./scss/App.scss";

function App() {
  return (
    <div className="App">
      <AnimatedBackground animationName="cosmicDust" />
      <header className="App-header">
          Welcome Youniversers!
      </header>
      <main>
      <section id="content">
        <p className="intro">
          Imagine this: You are a NASA Astronaut exploring the Milky Way in a spaceship. 
          You are tasked with exploring our solar system and getting information about it.
          If you answer the call, you will be enlightened beyond what you can imagine.
          <h3>ARE YOU READY TO ACCEPT THE CHALLENGE?</h3>
        </p>
        
        <motion.button whileHover={{ scale: 1.2 }}>Yes!</motion.button>
        <motion.button whileHover={{ scale: 1.2 }}>Yes!</motion.button>
      </section>
      </main>
    </div>
  );
}

export default App;
