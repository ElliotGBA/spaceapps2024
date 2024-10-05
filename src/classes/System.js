import { CelestialBody } from "./CelestialBody";

/**
 * System Class for containing CelestialBody objects
 */
class System {

    constructor(centralBody) {
        this.bodies = [];
        this.centralBody = centralBody;
    }

    addBody(celestialBody) {
        if (!(celestialBody instanceof CelestialBody))  {
            return;
        }

        this.bodies.push(celestialBody);
    }

}

export { System }