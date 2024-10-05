import { CelestialBody } from './CelestialBody';

// Gravitational constant
const G = 6.67430e-11; // Adjust units as per your simulation

class System {
    constructor(centralBody) {
        this.centralBody = centralBody;
        this.bodies = [];
    }

    addBody(celestialBody) {
        if (celestialBody instanceof CelestialBody) {
            this.bodies.push(celestialBody);
        }
    }

    calculateGravitationalForce(body, centralBody) {
        const dx = centralBody.position.x - body.position.x;
        const dy = centralBody.position.y - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) { return; }

        const force = (G * body.mass * centralBody.mass) / (distance * distance);
        const forceX = (force * dx) / distance;
        const forceY = (force * dy) / distance;

        // Update the acceleration of the body
        body.acceleration.x = forceX / body.mass;
        body.acceleration.y = forceY / body.mass;
    }

    updateBody(body, timeStep) {
        // Update velocity based on acceleration
        body.velocity.x += body.acceleration.x * timeStep;
        body.velocity.y += body.acceleration.y * timeStep;

        // Update position based on velocity
        body.position.x += body.velocity.x * timeStep;
        body.position.y += body.velocity.y * timeStep;
    }

    updatePhysics(timeStep) {
        // Update each planet's acceleration due to the central body (the Sun)
        this.bodies.forEach((body) => {
            this.calculateGravitationalForce(body, this.centralBody);
        });

        // Update positions and velocities of the planets and the central body
        this.bodies.forEach((body) => {
            this.updateBody(body, timeStep);
        });
    }

    setInitialOrbitalVelocities() {
        this.bodies.forEach((body) => {
            const dx = body.position.x - this.centralBody.position.x;
            const dy = body.position.y - this.centralBody.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance === 0) { return; }

            // Calculate perpendicular velocity for a circular orbit
            const orbitalVelocity = Math.sqrt((G * this.centralBody.mass) / distance);
            body.velocity = {
                x: -orbitalVelocity * (dy / distance), // Perpendicular to radius
                y: orbitalVelocity * (dx / distance),  // Perpendicular to radius
            };
        });
    }
}

export { System };
