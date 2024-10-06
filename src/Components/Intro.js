import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedBackground } from 'animated-backgrounds';

function Intro(){
    const navigate = useNavigate();
    const handleNavToHome = () => {
        navigate("/Home"); //navigate("/App");
    };

    return (
      <div className="Intro">
        <AnimatedBackground animationName="cosmicDust" />
        <header className="Intro-header">
            Welcome Youniversers!
        </header>
        <main>
        <section id="content">
          <p className="intro">
            Imagine this: You are a NASA Astronaut exploring the Milky Way in a spaceship. 
            You are tasked with exploring our solar system and getting information about it.
            If you answer the call, you will be enlightened beyond what you can imagine.
            <h3 className="intro ask">ARE YOU READY TO ACCEPT THE CHALLENGE?</h3>
          </p>
          
          <motion.button whileHover={{ scale: 1.2 }} onClick={handleNavToHome}>Yes!</motion.button> {/* onClick={handleClick}>*/}
          <motion.button whileHover={{ scale: 1.2 }} onClick={handleNavToHome}>Yes!</motion.button>
        </section>
        </main>
      </div>
    );
  }

export default Intro;