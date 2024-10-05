const planets = {
    "Sun": "10",
    "Mercury": "199",
    "Venus": "299",
    "Earth": "399",
    "Mars": "499",
    "Jupiter": "599",
    "Saturn": "699",
    "Uranus": "799",
    "Neptune": "899",
    "Pluto": "999"
}

const fetchPlanetPosition = async (planet, startDate, endDate, timeStep) => {
    const url = 'https://ssd.jpl.nasa.gov/api/horizons.api';
    const requestBody = {
        format: "json",
        COMMAND: planets[planet],
        OBJ_DATA: "YES",
        MAKE_EPHEM: "YES",
        EPHEM_TYPE: "VECTORS",
        CENTER: "@sun",
        START_TIME: startDate,
        STOP_TIME: endDate,
        STEP_SIZE: timeStep
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok huhuhu");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};