import React from "react";
import { motion } from "framer-motion";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Welcome Youniversers!
        </h1>
      </header>
      <main>
      <section id="content">
        <p>
          Imagine this: You are a NASA Astronaut exploring the Milky Way in a spaceship. 
          You are tasked with exploring our solar system and getting information about it.
          If you answer the call, you will be enlightened beyond what you can imagine.
        </p>
        <h3>ARE YOU READY TO ACCEPT THE CHALLENGE?</h3>
        <button>Yes!</button>
        <button>Yes!</button>
      </section>
      </main>
    </div>
  );
}

export default App;
