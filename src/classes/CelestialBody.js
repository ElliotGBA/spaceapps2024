class CelestialBody {

    constructor(mass, position, velocity, acceleration, radius, colour, name, initialVelocityVector, funFact) {
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.radius = radius;
        this.colour = colour;
        this.name = name;
        this.initialVelocityVector = initialVelocityVector;
        this.funFact = funFact;

        // display properties
        this.displayPosition = {x: position.x, y: position.y };
        this.displayRadius = radius;
    }

    updateDisplayProperties(scaleFactor) {
        this.displayPosition = {
            x: this.position.x / scaleFactor,
            y: this.position.y / scaleFactor,
        };
        this.displayRadius = this.radius / (scaleFactor / 1500000);
    }

    getPosition() {
        // round x and y to 2nd decimal place
        return roundTo(this.position.x, 2) + "," + roundTo(this.position.y, 2);
    }

    updatePosition(dt) {
        this.position.x += this.velocity.vx * dt + 0.5 * this.acceleration.x * dt * dt;
        this.position.y += this.velocity.vy * dt + 0.5 * this.acceleration.y * dt * dt;

    }

    setMass(newMass) {
        this.mass = newMass;
    }

    setMass(newMass) {
        this.mass = newMass;
    }


}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}
export { CelestialBody };
