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
        if (typeof celestialBody != CelestialBody)  {
            return;
        }

        this.bodies = this.bodies.concat([body]);
    }

    

}

export { System }