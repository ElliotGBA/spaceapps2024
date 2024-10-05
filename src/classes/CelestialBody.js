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

    get mass() {
        return this.mass;
    }
    set mass(newMass) {
        this.mass = newMass;
    }
    get position() {
        return this.position;
    }
    set position(newPosition) {
        this.position = newPosition;
    }
    get velocity() {
        return this.velocity;
    }
    set velocity(newVelocity) {
        this.velocity = newVelocity;
    }
    get acceleration() {
        return this.acceleration;
    }
    set acceleration(newAcceleration) {
        this.acceleration = newAcceleration;
    }
    get radius() {
        return this.radius;
    }
    set radius(newRadius) {
        this.radius = newRadius;
    }
    get colour() {
        return this.colour;
    }
    set colour(newColour) {
        this.colour = newColour;
    }
    get initialVelocityVector() {
        return this.initialVelocityVector;
    }
    set initialVelocityVector(newVelocityVector) {
        this.initialVelocityVector = newVelocityVector;
    }
    
}

export { CelestialBody }