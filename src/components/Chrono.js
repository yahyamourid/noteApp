import React, { useState, useEffect } from 'react';
const Chrono = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className='container'>
      <h1>Chrono</h1>
      <p>{seconds} secondes</p>
      <div>
        <button id='b1' onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
        <button id='b2' onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Chrono;
