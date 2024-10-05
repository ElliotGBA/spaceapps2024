import { Link } from "react-router-dom";
import "../scss/_navbar.scss";
// import "./scss/App.scss";

function NavBar() {
    return(
        <div className="navbar">
            <div className="navLinks">
                <ul>
                    <li>
                        <Link className="link" to="/App">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="/Gravity">
                            Gravity
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="/More">
                            More
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );

}

export default NavBar;