class CelestialBody {
    constructor(mass, position, velocity, acceleration, radius, colour, name, initialVelocityVector) {
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.radius = radius;
        this.colour = colour;
        this.name = name;
        this.initialVelocityVector = initialVelocityVector;
    }

    updatePosition(dt) {
        this.position.x += this.velocity.vx * dt + 0.5 * this.acceleration.x * dt * dt;
        this.position.y += this.velocity.vy * dt + 0.5 * this.acceleration.y * dt * dt;

    }
}

export { CelestialBody };
