import axios from "axios";
import { useState } from "react";

const BackendTest = () => {
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
    const [vX, setVx] = useState(0);
    const [vY, setVy] = useState(0);
    const params = [
        {
            label: "xPos",
            value: xPos
        },
        {
            label: "yPos",
            value: yPos
        },
        {
            label: "vX",
            value: vX
        },
        {
            label: "vY",
            value: vY
        },
    ];

    const handleRequest = async () => {
        const data = await getFromBackEnd();
        /*data elements are strings containing: 
        [ startDate xyz,
          startDate vx vy vz,
          endDate xyz, 
          endDate vx vy vz
        ]
         */
    
        console.log("data after exiting getFromBackEnd() is: ", data);
        if (data.length !== 4) {
            console.error("Error: Data returned in incorrect format.")
            return;
        }
        const xPos = +data[2].substring(4, 25);
        const yPos = +data[2].substring(30, 51);
        const vX = +data[3].substring(4, 25);
        const vY = +data[3].substring(30, 51);
        const paramData = [xPos, yPos, vX, vY];
        if (! (paramData.includes(NaN))) {
            setXPos(xPos);
            setYPos(yPos);
            setVx(vX);
            setVy(vY);
            return;
        }
        console.error("Invalid format in response data");
    }

    return(
        <>
        <button onClick={() => handleRequest()}>
            send req to backend

        </button>
        <div>
        {params.map((param) => {
            return(
            <p key={param.label}>
                {param.label} : {param.value}
            </p>
            )
        })
    }
        </div>
        </>
    )
}

/**
 * 
 * given a celestialBody and a date, fetch and return the 
 * x and y coordinates, and the vX vY values
 * of the celestial body at that date
 */

const getFromBackEnd = async (celestialBody, targetDate) => {

    const url = 'http://localhost:3001/api';
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    //temporary: overwriting targetDate until we format it elsewhere in frontend
    targetDate = `${year}-${month}-${day + 1}` 
    //end of temporary code

    /*data needed:
        vX, vY, position (x, y);
    */
    const getData = axios.get(url, {
        params: {
            format: "json",
            COMMAND: 199,
            OBJ_DATA: "YES",
            MAKE_EPHEM: "YES",
            EPHEM_TYPE: "VECTORS",
            START_TIME: `${year}-${month}-${day}`,
            STOP_TIME: targetDate,
            STEP_SIZE: "1d"
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error("error from backend is: ", error)
    })
    return getData;
}


export default BackendTest;