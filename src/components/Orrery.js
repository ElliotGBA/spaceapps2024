import React, { useEffect, useRef } from 'react';
import { System } from "../classes/System";
import { CelestialBody } from '../classes/CelestialBody';
import planetData from "../data/startingPlanetData.json";

let timeStep = 1; // overall speed of orrery

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

    planetData.planets.forEach((planet) => {
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
    
            // Draw the Sun
            const sunX = canvas.width / (2 * dpr);
            const sunY = canvas.height / (2 * dpr);
            const sunRadius = system.centralBody.radius / 50000;
    
            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI);
            ctx.fillStyle = system.centralBody.colour;
            ctx.fill();
            ctx.closePath();
    
            // Draw the orbital paths
            system.bodies.forEach((body, index) => {
                const path = planetPathsRef.current[index];
    
                // Add the current position to the path
                const planetX = sunX + body.position.x / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
                const planetY = sunY + body.position.y / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
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
    
            // Draw the planets
            system.bodies.forEach((body, index) => {
                const planetX = sunX + body.position.x / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
                const planetY = sunY + body.position.y / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
                const planetRadius = body.radius / (index < 4 ? 1000 : 5000);
    
                ctx.beginPath();
                ctx.arc(planetX, planetY, planetRadius, 0, 2 * Math.PI);
                ctx.fillStyle = body.colour;
                ctx.fill();
                ctx.closePath();
            });
        };
    
        const animate = () => {
            system.updatePhysics(timeStep); // Update physics with a time step
            draw();
            requestAnimationFrame(animate); // Request next frame
        };
    
        requestAnimationFrame(animate);
    }, []);
    

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            style={{ display: 'block', backgroundColor: 'black' }}
        />
    );
};

export default Orrery;
