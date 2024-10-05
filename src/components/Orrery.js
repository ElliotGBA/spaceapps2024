import React, { useEffect, useRef } from 'react';
import { System } from "../classes/System";
import { CelestialBody } from '../classes/CelestialBody';
import planetData from "../data/startingPlanetData.json";

let timeStep = 0.5; // speed of orrery

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

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const system = systemRef.current;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the Sun
            const sunX = canvas.width / 2;
            const sunY = canvas.height / 2;
            const sunRadius = system.centralBody.radius / 50000;

            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI);
            ctx.fillStyle = system.centralBody.colour;
            ctx.fill();
            ctx.closePath();

            // Draw the planets
            system.bodies.forEach((body, index) => {
                const planetX = canvas.width / 2 + body.position.x / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
                const planetY = canvas.height / 2 + body.position.y / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
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
            draw(); // Draw the updated positions
            requestAnimationFrame(animate); // Request next frame
        };

        // Start the animation
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
