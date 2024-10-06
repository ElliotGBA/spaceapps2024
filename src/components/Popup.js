import React from 'react';
import "../scss/Popup.scss"; // Assuming you have styles for the popup here
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

const Popup = ({ planet, onClose, onUpdateMass }) => {
    if (!planet) return null;

    return (
        <div className="popup">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>{planet.name}</h2>
            <p>
                Mass: {planet.mass.toExponential(2)} kg
                <button className="massButton" onClick={() => onUpdateMass(planet, -1)}>
                    <GoTriangleDown />
                </button>
                <button className="massButton" onClick={() => onUpdateMass(planet, 1)}>
                    <GoTriangleUp />
                </button>
            </p>
            <p>Radius: {planet.radius} km</p>
            <p>{planet.funFact}</p>
        </div>
    );
};

export default Popup;
