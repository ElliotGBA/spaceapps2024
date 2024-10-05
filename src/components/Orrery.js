import React, { useEffect, useState } from 'react';
import { System } from "../classes/System";
import { CelestialBody } from '../classes/CelestialBody';
import planetData from "../data/startingPlanetData.json";

const createSolarSystem = () => {

    const SunData = planetData.sun;
    const Sun = new CelestialBody(
        SunData.mass,
        SunData.position,
        SunData.velocity,
        { x: 0, y: 0}, // initial acceleration is 0
        SunData.radius,
        SunData.color,
        SunData.name,
        SunData.velocity,
    );

    const solarSystem = new System(Sun); // initailize the solar system around the sun

    planetData.planets.forEach((planet) => {
        const newPlanet = new CelestialBody(
            planet.mass,
            planet.position,
            planet.velocity,
            { x: 0, y: 0 },
            planet.radius,
            planet.color,
            planet.name,
            planet.velocity
        );
        solarSystem.addBody(newPlanet);
    });

    return solarSystem;
}

const Orrery = () => {

    const [system, setSystem] = useState(null);

    useEffect(() => {
        const initailizedSystem = createSolarSystem();
        console.log(initailizedSystem);
        setSystem(initailizedSystem);
    }, []);

    return (
        <div id="orrery" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {system && (
                <>
                    {/* Render the Sun (centralBody) */}
                    <div style={{
                        position: 'absolute',
                        left: `calc(50% + ${system.centralBody.position.x / 10000000}px)`, // Center + scaled position
                        top: `calc(50% + ${system.centralBody.position.y / 10000000}px)`, // Center + scaled position
                        width: `${system.centralBody.radius / 5000}px`,
                        height: `${system.centralBody.radius / 5000}px`,
                        backgroundColor: system.centralBody.colour,
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        {system.centralBody.name}
                    </div>
    
                    {/* Render the planets */}
                    {system.bodies.map((body, index) => (
                        <div key={index} style={{
                            position: 'absolute',
                            left: `calc(50% + ${body.position.x / 1000000}px)`, // Center + scaled position
                            top: `calc(50% + ${body.position.y / 1000000}px)`, // Center + scaled position
                            width: `${index < 4 ? body.radius / 200 : body.radius / 700}px`, // Make the last 4 planets smaller
                            height: `${index < 4 ? body.radius / 200 : body.radius / 700}px`, // Make the last 4 planets smaller
                            backgroundColor: body.colour,
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            {body.name}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Orrery
