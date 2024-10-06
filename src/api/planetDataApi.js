import axios from "axios";


const getFromBackEnd = async (bodyName, targetDate) => {

    const BODY_CODES = {
        "Sun": 10,
        "Mercury": 199,
        "Venus": 299,
        "Earth": 399,
        "Moon": 301,
        "Mars": 499,
        "Phobos": 401,
        "Deimos": 402,
        "Jupiter": 599,
        "Io": 501,
        "Europa": 502,
        "Ganymede": 503,
        "Callisto": 504,
        "Saturn": 699,
        "Titan": 606,
        "Enceladus": 602,
        "Uranus": 799,
        "Miranda": 705,
        "Ariel": 701,
        "Umbriel": 702,
        "Titania": 703,
        "Oberon": 704,
        "Neptune": 899,
        "Triton": 801,
        "Pluto": 999,
        "Charon": 901
    };
      
    const url = 'http://localhost:3001/api';
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    //temporary: overwriting targetDate until we format it elsewhere in frontend
     targetDate = targetDate ? targetDate : `${year}-${month}-${day + 1}` 
    //end of temporary code

    /*data needed:
        vX, vY, position (x, y);
    */
    const getData = axios.get(url, {
        params: {
            format: "json",
            CENTER: "@10",
            COMMAND: BODY_CODES[bodyName],
            OBJ_DATA: "YES",
            MAKE_EPHEM: "YES",
            EPHEM_TYPE: "VECTORS",
            START_TIME: `${year}-${month}-${day}`,
            STOP_TIME: targetDate,
            STEP_SIZE: "1d",
        },
    }).then((response) => {
        //returns 4 lines containing x, y, vx, vy, coords
        return response.data;
    }).catch((error) => {
        console.error("error from backend is: ", error)
    })
    return getData;
}

/* 
* get and return x, y, vx, vy params for celestial body 
* at a given date
*/
export const fetchParams = async (bodyName, targetDate) => {
    console.log("fetch params called!")
    const data = await getFromBackEnd(bodyName, targetDate);
    /*data elements are strings containing: 
        [ startDate xyz,
          startDate vx vy vz,
          endDate xyz, 
          endDate vx vy vz
        ]
    */  
   
    if (data.length !== 4) {
        console.error("Error: Data returned in incorrect format.")
        return;
    }
    
    const xPos = +data[2].substring(4, 25);
    const yPos = +data[2].substring(30, 51);
    const vX = +data[3].substring(4, 25);
    const vY = +data[3].substring(30, 51);
    const paramData = [xPos, yPos, vX, vY];
    
    return paramData.includes(NaN) 
        ? 
        {error: "error, malformatted data response"}
        :
        paramData;
}
