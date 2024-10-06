import React from 'react';

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoPause } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";


const TimeControlButtons = ({ timeStep, onTimeStepChange, onTogglePause, isPaused }) => {
    const handleSlowBack = () => {
        onTimeStepChange(timeStep - 0.4);
    };

    const handleFastBack = () => {
        onTimeStepChange(timeStep - 1);
    };

    const handleSlowForward = () => {
        onTimeStepChange(timeStep + 0.4);
    };

    const handleFastForward = () => {
        onTimeStepChange(timeStep + 1);
    };

    const handlePausePlay = () => {
        onTogglePause();
    };

    return (
        <div className="timeControlButtons">
            <button onClick={handleFastBack}><MdKeyboardDoubleArrowLeft /></button>
            <button onClick={handleSlowBack}><MdKeyboardArrowLeft /></button>
            <button onClick={handlePausePlay}>{isPaused ? <IoPlay /> : <IoPause />}</button>
            <button onClick={handleSlowForward}><MdKeyboardArrowRight /></button>
            <button onClick={handleFastForward}><MdKeyboardDoubleArrowRight /></button>
        </div>
    );
};

export default TimeControlButtons;
