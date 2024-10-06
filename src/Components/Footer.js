import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'; 
import { faRocket } from '@fortawesome/free-solid-svg-icons'; 
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons'; 
import { faS } from '@fortawesome/free-solid-svg-icons'; 
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'; 
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons'; 

function Footer() {
    return(
        <div className="navfooter">
            <div className="footer">
                <ul className="footer1">
                    <li>
                        <FontAwesomeIcon className="fontIcon" icon={faEarthAmericas} style={{color: "#FFD43B",}} />
                        <Link className="link" to="/Home">
                            NASA Space Apps Challenge
                        </Link>
                    </li>
                    <li>
                        <FontAwesomeIcon className="fontIcon" icon={faRocket} style={{color: "#FFD43B",}}/>
                        <Link className="link" to="/Gravity">
                            NASA
                        </Link>
                    </li>
                    <li>
                    <FontAwesomeIcon className="fontIcon" icon={faCanadianMapleLeaf} style={{color: "#FFD43B",}}/>
                        <Link className="link" to="/More">
                            CSA
                        </Link>
                    </li>
                </ul>
                <ul className="footer2">
                    <li>
                    <FontAwesomeIcon className="fontIcon" icon={faWikipediaW} style={{color: "#FFD43B",}}/>
                        <Link className="link" to="/More">
                            Wikipedia
                        </Link>
                    </li>
                    <li>
                        <FontAwesomeIcon className="fontIcon" icon={faS} style={{color: "#FFD43B",}}/>
                        <Link className="link" to="/More">
                            Shiftkey labs
                        </Link>
                    </li>
                    <li>
                        <FontAwesomeIcon className="fontIcon" icon={faGraduationCap} style={{color: "#FFD43B",}}/>
                        <Link className="link" to="/More">
                            Dalhousie
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;