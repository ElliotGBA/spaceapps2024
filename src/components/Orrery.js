import React, { useEffect, useRef, useState } from 'react';
import { System } from "../classes/System";
import { CelestialBody } from '../classes/CelestialBody';
import planetData from "../data/startingPlanetData.json";

// add 2 sliders: one to change the timestep and one to change the mass

/**
 * timeStep is the 
 * 1.397 = 1 day / frame
 * 0.058 = 1 hour / frame
 * 9.779 = 1 week / frame
 */
let timeStep = 0.058; // overall speed of orrery

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
    //for animations to make them go smoother
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
        
            // Draw the planets and labels
            system.bodies.forEach((body, index) => {
                const planetX = sunX + body.position.x / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
                const planetY = sunY + body.position.y / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
                const planetRadius = body.radius / (index < 4 ? 1000 : 5000);
        
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
                //ctx.fillText(body.getPosition(), planetX, planetY + planetRadius + 20);

            //     canvas.addEventListener('click', (event) => {
            //         const rect = canvas.getBoundingClientRect();
            //         const mouseX = (event.clientX - rect.left) * dpr;
            //         const mouseY = (event.clientY - rect.top) * dpr;

            //         const distance = Math.sqrt(
            //             Math.pow(mouseX - planetX, 2) + Math.pow(mouseY - planetY, 2)
            //         );

            //         // Check if the click is within the radius of the planet
            //         if (distance < planetRadius) {
            //             setSelectedPlanet(body); // Set the selected planet
            //             // setShowSlider(true); // Show the slider
            //         }
            //     });
            });
        };
        
    
        const animate = () => {
            system.updatePhysics(timeStep); // Update physics with a time step
            draw();
            requestAnimationFrame(animate); // Request next frame
        };
    
        requestAnimationFrame(animate);


        const handleClick = (event) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = (event.clientX - rect.left) * dpr;
                const mouseY = (event.clientY - rect.top) * dpr;
                console.log("Mouse x: ", mouseX, "Mouse Y: ", mouseY);

                const clickedPlanet = checkIfPlanetClicked(mouseX, mouseY);
                console.log(clickedPlanet);
                if(clickedPlanet){
                    setSelectedPlanet({...clickedPlanet});
                    console.log("planet clicked: ", clickedPlanet.name);
                }

                // Check if the click is within the radius of the planet
                // if (distance < planetRadius) {
                //     setSelectedPlanet(body); // Set the selected planet
                //     // setShowSlider(true); // Show the slider
                // }
        };
        canvas.addEventListener("mousedown", handleClick);
        return () => {
            canvas.removeEventListener("mousedown", handleClick);
        }
    }, []);

    const checkIfPlanetClicked = (x, y) => {
        const canvas = canvasRef.current;
        const system = systemRef.current;
        const sunX = canvas.width / (2 * window.devicePixelRatio);
        const sunY = canvas.height / (2 * window.devicePixelRatio);
        
        // Iterate through the planets to check if one was clicked
        for (let i = 0; i < system.bodies.length; i++) {
            const body = system.bodies[i];
            const planetX = sunX + body.position.x / (i < 4 ? 2500000 : (i < 6 ? 6000000 : 10000000));
            const planetY = sunY + body.position.y / (i < 4 ? 2500000 : (i < 6 ? 6000000 : 10000000));
            // const planetRadius = body.radius / (i < 4 ? 1000 : 5000);
            const planetRadius = body.radius
            const distance = (Math.sqrt((x - planetX) ** 2 + (y - planetY) ** 2)) / (i < 4 ? 1000 : 5000);
            // const distance = (Math.sqrt((x - planetX) ** 2 + (y - planetY) ** 2))
            console.log("radius:", planetRadius);
            // console.log("something: ", (body.position.x + planetRadius));
            console.log("distance:", distance);
            // if (distance <= planetRadius) {
            // if (distance >= body.position.x || distance <= body.position.x + planetRadius) {
            // console.log("body x positon" ,body.position.x);
            // if (x >= body.position.x && x <= body.position.x + planetRadius) {
            // if (distance <= planetRadius && distance >= planetRadius/2) {
            if (x >= planetX - planetRadius && x <= planetX + planetRadius) {
                return body; // Return the clicked planet
            }
        }
        return null;
    };

    // const handleMouseDown = (event) => {
    //     const canvas = canvasRef.current;
    //     const rect = canvas.getBoundingClientRect();
    //     const x = event.clientX - rect.left;
    //     const y = event.clientY - rect.top;

    //     const clickedPlanet = checkIfPlanetClicked(x, y);
    //     if (clickedPlanet) {
    //         systemRef.current = clickedPlanet; // Set the clicked planet as systemRef.current
    //         console.log('Planet clicked:', clickedPlanet.name);
    //     }
    // };

    const [massScale, setMassScale] = useState(1);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const handleMassChange = (event) => {
        const newMassScale = parseFloat(event.target.value);
        setMassScale(newMassScale);
        // systemRef.current.bodies.forEach((body) => {
        //     body.mass = body.mass * newMassScale;
        // });

        //use a for loop, iterate through the System array
        // const sun = systemRef.current.centralBody;
        // sun.mass = sun.mass * newMassScale;
        if(selectedPlanet){
            selectedPlanet.mass = selectedPlanet.mass * newMassScale;
        }



        // if (selectedPlanet) {
        //     const updatedPlanet = { ...selectedPlanet, mass: selectedPlanet.mass * newMassScale };
        //     setSelectedPlanet(updatedPlanet);
        // }




        // for(let i = 0; i < systemRef.bodies.length; i++){
        //     const body = systemRef.bodies[i];
        //     const planetX = sunX + body.position.x / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
        //     const planetY = sunY + body.position.y / (index < 4 ? 2500000 : (index < 6 ? 6000000 : 10000000));
        //     const planetRadius = body.radius / (index < 4 ? 1000 : 5000);
        //     const distance = Math.sqrt((x - planetX) ** 2 + (y - planetY) ** 2);
        //     if (distance <= planetRadius) {
        //         return body; // Return the clicked planet
        //     }
        // };

        
    
    }
    

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight*0.5}
                style={{ display: 'block', backgroundColor: 'black' }}
            />
            <div>
                <label>
                    Mass Scale:
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={massScale}
                        onChange={handleMassChange}
                    />
                </label>
            </div>
        </div>
    );
};

export default Orrery;
