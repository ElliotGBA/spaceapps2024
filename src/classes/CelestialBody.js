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
    
}

export { CelestialBody }