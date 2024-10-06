import { CelestialBody } from "./CelestialBody";

class System {
    constructor(centralBody) {
        this.bodies = [];
        this.centralBody = centralBody;
        this.orbitalPaths = {};
    }

    addBody(celestialBody) {
        if (celestialBody instanceof CelestialBody) {
            this.bodies.push(celestialBody);
            // Initialize an array to store the orbital path of the new body
            this.orbitalPaths[celestialBody.id] = {
                path: [],
                maxLength: 0,
            };
        }
    }

    setInitialOrbitalVelocities() {
        this.bodies.forEach((body) => {
            const dx = body.position.x - this.centralBody.position.x;
            const dy = body.position.y - this.centralBody.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const G = 6.67430e-11; // Gravitational constant
            const velocityMagnitude = Math.sqrt((G * this.centralBody.mass) / distance);

            const unitVector = { x: -dy / distance, y: dx / distance };
            body.velocity = {
                x: velocityMagnitude * unitVector.x,
                y: velocityMagnitude * unitVector.y,
            };

            // Store the initial position for the orbital trail
            this.orbitalPaths[body.id].path.push({ x: body.position.x, y: body.position.y });
            // Set maxLength inversely proportional to the velocity (faster = shorter path)
            this.orbitalPaths[body.id].maxLength = Math.max(10, Math.floor(1000 / velocityMagnitude));
        });
    }

    updatePhysics(timeStep) {
        const G = 6.67430e-11; // Gravitational constant
    
        // Calculate gravitational force between all bodies
        this.bodies.forEach((body) => {
            let forceX = 0;
            let forceY = 0;
    
            // Calculate gravitational force exerted by the central body (e.g., the Sun)
            const dxSun = this.centralBody.position.x - body.position.x;
            const dySun = this.centralBody.position.y - body.position.y;
            const distanceSun = Math.sqrt(dxSun * dxSun + dySun * dySun);
            const forceMagnitudeSun = (G * this.centralBody.mass * body.mass) / (distanceSun * distanceSun);
            forceX += forceMagnitudeSun * (dxSun / distanceSun); // Calculate the x-component of the force
            forceY += forceMagnitudeSun * (dySun / distanceSun); // Calculate the y-component of the force
    
            // Calculate gravitational forces exerted by all other bodies
            this.bodies.forEach((otherBody) => {
                if (otherBody !== body) { // Avoid self-interaction
                    const dx = otherBody.position.x - body.position.x;
                    const dy = otherBody.position.y - body.position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceMagnitude = (G * otherBody.mass * body.mass) / (distance * distance);
                    forceX += forceMagnitude * (dx / distance); // Add the x-component of the force
                    forceY += forceMagnitude * (dy / distance); // Add the y-component of the force
                }
            });
    
            // Calculate acceleration based on the net force
            body.acceleration = {
                x: forceX / body.mass, // F = ma -> a = F/m
                y: forceY / body.mass, // F = ma -> a = F/m
            };
        });
    
        // Update velocities and positions of each body
        this.bodies.forEach((body) => {
            // Update velocity based on the acceleration
            body.velocity.x += body.acceleration.x * timeStep; // v = v0 + at
            body.velocity.y += body.acceleration.y * timeStep; // v = v0 + at
    
            // Update position based on the velocity
            body.position.x += body.velocity.x * timeStep; // x = x0 + vt
            body.position.y += body.velocity.y * timeStep; // y = y0 + vt
    
            // Update the orbital path for visualization
            const pathInfo = this.orbitalPaths[body.id];
            pathInfo.path.push({ x: body.position.x, y: body.position.y }); // Add the new position to the orbital path
    
            // If the queue (orbital path) is full, remove the oldest position
            if (pathInfo.path.length > pathInfo.maxLength) {
                pathInfo.path.shift(); // Maintain the max length of the path queue
            }
        });
    }
    
}

export { System };
