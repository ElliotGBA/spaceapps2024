import React from 'react';

const TimeControlButtons = ({ timeStep, onTimeStepChange, onTogglePause, isPaused }) => {
    const handleSlowBack = () => {
        onTimeStepChange(timeStep * 1.2);
    };

    const handleFastBack = () => {
        onTimeStepChange(timeStep * 2);
    };

    const handleSlowForward = () => {
        onTimeStepChange(timeStep / 1.2);
    };

    const handleFastForward = () => {
        onTimeStepChange(timeStep / 2);
    };

    const handlePausePlay = () => {
        onTogglePause();
    };

    return (
        <div className="timeControlButtons">
            <button onClick={handleSlowBack}>Slow Back</button>
            <button onClick={handleFastBack}>Fast Back</button>
            <button onClick={handlePausePlay}>{isPaused ? 'Play' : 'Pause'}</button>
            <button onClick={handleSlowForward}>Slow Forward</button>
            <button onClick={handleFastForward}>Fast Forward</button>
        </div>
    );
};

export default TimeControlButtons;
