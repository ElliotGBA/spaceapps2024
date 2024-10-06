import React, { useEffect, useRef, useState } from 'react';
import { System } from "../classes/System";
import { CelestialBody } from '../classes/CelestialBody';
import planetData from "../data/startingPlanetData.json";
import "../scss/Orrery.scss";
import TimeControlButtons from './TimeControlButtons';
import Popup from './Popup'; // Import the Popup component

const createSolarSystem = () => {
    const SunData = planetData.sun;
    const Sun = new CelestialBody(
        SunData.mass,
        SunData.position,
        SunData.velocity,
        { x: 0, y: 0 },
        SunData.radius,
        SunData.color,
        SunData.name,
        SunData.velocity,
        SunData.funFact,
    );

    const solarSystem = new System(Sun);

    planetData.planets.forEach((planet) => {
        const newPlanet = new CelestialBody(
            planet.mass,
            planet.position,
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            planet.radius,
            planet.color,
            planet.name,
            planet.velocity,
            planet.funFact
        );
        solarSystem.addBody(newPlanet);
    });

    solarSystem.setInitialOrbitalVelocities();

    return solarSystem;
}

const Orrery = () => {
    const canvasRef = useRef(null);
    const systemRef = useRef(createSolarSystem());
    const planetPathsRef = useRef([]);
    const frameIdRef = useRef(null);
    const [timeStep, setTimeStep] = useState(1.4);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const system = systemRef.current;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);

        planetPathsRef.current = system.bodies.map(() => []);

        const handleCanvasClick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (event.clientX - rect.left) * dpr;
            const mouseY = (event.clientY - rect.top) * dpr;
        
            const sunX = canvas.width / (2 * dpr);
            const sunY = canvas.height / (2 * dpr);
            const sunRadius = system.centralBody.displayRadius / 1000; // Adjusted for scaling
        
            let clickedOnPlanet = false; // Track if a planet or the Sun was clicked
        
            // Check if the click was on any of the planets
            system.bodies.forEach((body) => {
                const planetX = sunX + body.displayPosition.x;
                const planetY = sunY + body.displayPosition.y;
                const planetRadius = body.displayRadius / 1000;
        
                const distanceToPlanet = Math.sqrt(
                    (mouseX - planetX) ** 2 + (mouseY - planetY) ** 2
                );
        
                // Check if the click was on the planet
                if (distanceToPlanet <= planetRadius) {
                    setSelectedPlanet(body); // Set the selected planet
                    clickedOnPlanet = true; // A planet was clicked
                }
            });
        
            // Only check the Sun if no planets were clicked
            if (!clickedOnPlanet) {
                const distanceToSun = Math.sqrt(
                    (mouseX - sunX) ** 2 + (mouseY - sunY) ** 2
                );
        
                if (distanceToSun <= sunRadius) {
                    setSelectedPlanet(system.centralBody);
                } else {
                    setSelectedPlanet(null); // Close popup if clicked outside any celestial body
                }
            }
        };
        
        

        canvas.addEventListener('mousedown', handleCanvasClick);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            system.bodies.forEach((body, index) => {
                body.updateDisplayProperties(index < 4 ? 2500000 : (index < 6 ? 6000000 : 8000000));
            });

            const sunX = canvas.width / (2 * dpr);
            const sunY = canvas.height / (2 * dpr);
            const sunRadius = system.centralBody.displayRadius / 50000;

            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI);
            ctx.fillStyle = system.centralBody.colour;
            ctx.fill();
            ctx.closePath();

            system.bodies.forEach((body, index) => {
                const path = planetPathsRef.current[index];

                const planetX = sunX + body.displayPosition.x;
                const planetY = sunY + body.displayPosition.y;
                path.push({ x: planetX, y: planetY });

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

            system.bodies.forEach((body) => {
                const planetX = sunX + body.displayPosition.x;
                const planetY = sunY + body.displayPosition.y;
                const planetRadius = body.displayRadius / 1000;

                ctx.beginPath();
                ctx.arc(planetX, planetY, planetRadius, 0, 2 * Math.PI);
                ctx.fillStyle = body.colour;
                ctx.fill();
                ctx.closePath();

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

        return () => {
            cancelAnimationFrame(frameIdRef.current);
            canvas.removeEventListener('mousedown', handleCanvasClick);
        };
    }, [timeStep, isPaused]);

    const handleTimeStepChange = (newTimeStep) => {
        setTimeStep(newTimeStep);
    };

    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    const handleClosePopup = () => {
        setSelectedPlanet(null); // Deselect the planet
    };

    const handleUpdateMass = (planet, magnitudeChange) => {
        // Update the mass in the System's planet list
        const updatedPlanet = systemRef.current.bodies.find(
            (body) => body.name === planet.name
        );
    
        if (updatedPlanet) {
            updatedPlanet.setMass(updatedPlanet.mass * Math.pow(10, magnitudeChange));
            setSelectedPlanet({ ...updatedPlanet }); // Update the state with the new mass
        }
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
            {selectedPlanet && (
                <Popup planet={selectedPlanet} onClose={handleClosePopup} onUpdateMass={handleUpdateMass} />
            )}
        </>
    );
};

export default Orrery;
