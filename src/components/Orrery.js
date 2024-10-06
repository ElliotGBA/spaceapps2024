import React, { useEffect, useRef, useState } from 'react';
import { System } from "../classes/System";
import { CelestialBody } from '../classes/CelestialBody';
import planetData from "../data/startingPlanetData.json";
import "../scss/Orrery.scss";
import TimeControlButtons from './TimeControlButtons';
//import { fetchParams } from '../api/planetDataApi';

const createSolarSystem = () => {
    const SunData = planetData.sun;
    const Sun = new CelestialBody(
        SunData.mass,
        SunData.position,
        SunData.velocity,
        { x: 0, y: 0 }, // initial acceleration is 0
        SunData.radius,
        SunData.color,
        SunData.name,
        SunData.velocity,
    );

    const solarSystem = new System(Sun); // Initialize the solar system around the sun

    planetData.planets.forEach( (planet) => {

        const newPlanet = new CelestialBody(
            planet.mass,
            planet.position,
            { x: 0, y: 0 }, // Initial velocity is set later
            { x: 0, y: 0 },
            planet.radius,
            planet.color,
            planet.name,
            planet.velocity
        );

        solarSystem.addBody(newPlanet);
    });

    solarSystem.setInitialOrbitalVelocities(); // Set initial velocities for orbital movement
    return solarSystem;
}


const Orrery = () => {
    const canvasRef = useRef(null);
    const systemRef = useRef(createSolarSystem());
    const planetPathsRef = useRef([]);
    const frameIdRef = useRef(null);
    // 1.4 timsStep = 1 day / frame
    const [timeStep, setTimeStep] = useState(1.4);
    const [isPaused, setIsPaused] = useState(false); // pause state
    
    //const [paramData, setParamData] = useState([]);

    /*
    Code snippet that would be used to get x, y, vx, vy parameters for a celestialBody
    If we had more time, this would be incorporated to fetch data for each celestialBody
    in our Solar System. 
    fetchParams function sends a GET request to our backend's API route, which then sends
    those parameters to the NASA Horizons api.

    useEffect(() => {
        const getData = async() => {
            return await fetchParams("Earth");
        }
        getData().then( res => {
            //paramData contains (x, y, vx, vy);
            setParamData(res);
        });
    }, []);
    
    */

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const system = systemRef.current;    
        // Adjust canvas resolution for device pixel ratio
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        // Initialize paths for each planet
        planetPathsRef.current = system.bodies.map(() => []);
    
        const draw = () => {
            // Clear canvas with appropriate scaling
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    
            // Update display properties based on index for scaling
            system.bodies.forEach((body, index) => {
                //body.updateDisplayProperties(index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
                body.updateDisplayProperties(1000000);
            });
    
            // Draw the Sun
            const sunX = canvas.width / (2 * dpr);
            const sunY = canvas.height / (2 * dpr);
            const sunRadius = system.centralBody.displayRadius / 50000;
    
            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI);
            ctx.fillStyle = system.centralBody.colour;
            ctx.fill();
            ctx.closePath();
    
            // Draw the orbital paths
            system.bodies.forEach((body, index) => {
                const path = planetPathsRef.current[index];
    
                // Add the current position to the path
                const planetX = sunX + body.displayPosition.x;
                const planetY = sunY + body.displayPosition.y;
                path.push({ x: planetX, y: planetY });
    
                // Draw the path
                ctx.beginPath();
                ctx.strokeStyle = body.colour;
                ctx.lineWidth = 0.5;
                for (let i = 0; i < path.length - 1; i++) {
                    ctx.moveTo(path[i].x, path[i].y);
                    ctx.lineTo(path[i + 1].x, path[i + 1].y);
                }
                ctx.stroke();
                ctx.closePath();
            });
            
    
            // Draw the planets and labels
            system.bodies.forEach((body) => {
                const planetX = sunX + body.displayPosition.x;
                const planetY = sunY + body.displayPosition.y;
                const planetRadius = body.displayRadius / 1000;
    
                // Draw the planet
                ctx.beginPath();
                ctx.arc(planetX, planetY, planetRadius, 0, 2 * Math.PI);
                ctx.fillStyle = body.colour;
                ctx.fill();
                ctx.closePath();
    
                // Draw the label
                ctx.fillStyle = 'white';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(body.name, planetX, planetY + planetRadius + 10);
            });
        };
    
        const animate = () => {
            if (!isPaused) {
                system.updatePhysics(timeStep);
            }
            draw();
            frameIdRef.current = requestAnimationFrame(animate);
        };
    
        frameIdRef.current = requestAnimationFrame(animate);
    
        return () => cancelAnimationFrame(frameIdRef.current); // Clean up on unmount
    }, [timeStep, isPaused]); // Re-run effect if timeStep or isPaused changes

    const handleTimeStepChange = (newTimeStep) => {
        setTimeStep(newTimeStep);
    };

    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ display: 'block', backgroundColor: 'black' }}
            />
            <div className="timeButtons">
                <TimeControlButtons
                    timeStep={timeStep}
                    onTimeStepChange={handleTimeStepChange}
                    onTogglePause={togglePause}
                    isPaused={isPaused}
                />
            </div>
            
        </>
    );
};

export default Orrery;