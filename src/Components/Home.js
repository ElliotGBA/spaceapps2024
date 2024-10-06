import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Orrery from "../components/Orrery";
import "../scss/App.scss";

function Home() {
    return (
        <div className="Home">
            <div className="youniverse">
                <nav className="Logo">
                    <a href="/Home" title="Back to Home Page">
                        <img src="https://img.freepik.com/free-vector/cute-helmet-astronaut-space-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-7378.jpg" alt='astronaut'></img>
                    </a>
                </nav>
                <h1>Welcome Youniversers!</h1>
            </div>
            <NavBar />
            <Orrery />
            <Footer />
        </div>
    );
}

export default Home;