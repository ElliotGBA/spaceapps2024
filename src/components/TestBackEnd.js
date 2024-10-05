import axios from "axios";

const getFromBackEnd = () => {
    const url = 'http://localhost:3001/api';
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    axios.get(url, {
        params: {
            format: "json",
            COMMAND: 199,
            OBJ_DATA: "YES",
            MAKE_EPHEM: "YES",
            EPHEM_TYPE: "VECTORS",
            START_TIME: `${year}-${month}-${day-1}`,
            STOP_TIME: `${year}-${month}-${day}`
        },
    }).then((response) => {
        console.log("Response from backend is: ", response)
    }).catch((error) => {
        console.error("error from backend is: ", error)
    })
}

const BackendTest = () => {

    return(
        <div>
        <button onClick={() => getFromBackEnd()}>
            send req to backend
        </button>
        </div>
    )
}

export default BackendTest;