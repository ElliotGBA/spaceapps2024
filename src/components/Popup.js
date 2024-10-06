import React from 'react';
import "../scss/Popup.scss"; // Assuming you have styles for the popup here

const Popup = ({ planet, onClose }) => {
    if (!planet) return null;

    return (
        <div className="popup">
            <button className="close-button" onClick={onClose}>X</button>
            <h2>{planet.name}</h2>
            <p>Mass: {planet.mass}kg</p>
            <p>Radius: {planet.radius}km</p>
            <p>{planet.funFact}</p>
        </div>
    );
};

export default Popup;
