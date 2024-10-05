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
            // Initialize a Set to store the orbital path of the new body
            this.orbitalPaths[celestialBody.id] = new Set();
        }
    }

    setInitialOrbitalVelocities() {
        // Set initial velocity for each body for circular orbits around the central body
        this.bodies.forEach((body) => {
            const dx = body.position.x - this.centralBody.position.x;
            const dy = body.position.y - this.centralBody.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Calculate the magnitude of the velocity for a circular orbit
            const G = 6.67430e-11; // Gravitational constant
            const velocityMagnitude = Math.sqrt((G * this.centralBody.mass) / distance);

            // Set the velocity vector perpendicular to the position vector (for circular orbit)
            const unitVector = { x: -dy / distance, y: dx / distance };
            body.velocity = {
                x: velocityMagnitude * unitVector.x,
                y: velocityMagnitude * unitVector.y,
            };

            // Store the initial position for the orbital trail
            const positionString = `${body.position.x},${body.position.y}`;
            this.orbitalPaths[body.id].add(positionString);
        });
    }

    updatePhysics(timeStep) {
        const G = 6.67430e-11; // Gravitational constant

        // Calculate gravitational force between all bodies
        this.bodies.forEach((body) => {
            let forceX = 0;
            let forceY = 0;

            // Calculate force from central body (the sun)
            const dxSun = this.centralBody.position.x - body.position.x;
            const dySun = this.centralBody.position.y - body.position.y;
            const distanceSun = Math.sqrt(dxSun * dxSun + dySun * dySun);
            const forceMagnitudeSun = (G * this.centralBody.mass * body.mass) / (distanceSun * distanceSun);
            forceX += forceMagnitudeSun * (dxSun / distanceSun);
            forceY += forceMagnitudeSun * (dySun / distanceSun);

            // Calculate force from other planets
            this.bodies.forEach((otherBody) => {
                if (otherBody !== body) {
                    const dx = otherBody.position.x - body.position.x;
                    const dy = otherBody.position.y - body.position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceMagnitude = (G * otherBody.mass * body.mass) / (distance * distance);
                    forceX += forceMagnitude * (dx / distance);
                    forceY += forceMagnitude * (dy / distance);
                }
            });

            // Update acceleration based on force
            body.acceleration = {
                x: forceX / body.mass,
                y: forceY / body.mass,
            };
        });

        // Update velocities and positions
        this.bodies.forEach((body) => {
            body.velocity.x += body.acceleration.x * timeStep;
            body.velocity.y += body.acceleration.y * timeStep;

            body.position.x += body.velocity.x * timeStep;
            body.position.y += body.velocity.y * timeStep;

            const positionString = `${body.position.x},${body.position.y}`;
            this.orbitalPaths[body.id].add(positionString);
        });
    }
}

export { System };
