//TODO: STEP 1 - Import the useState hook.
import React, {useState, useEffect} from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(7);
  const [awayScore, setAwayScore] = useState(24);
  const [quarter, setQuarter] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [tenSeconds, setTenSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [tenMinutes, setTenMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setTenSeconds(0);
    setMinutes(0);
    setTenMinutes(0);
    setIsActive(false);
  }

  //first digit
  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      if(seconds > 9) {
        setSeconds(0);
      }
    }else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  //tenths digit
  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setTenSeconds(tenSeconds => tenSeconds + 1);
      }, 10000);
      if(tenSeconds > 5) {
        setTenSeconds(0);
      }
    }else if (!isActive && tenSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, tenSeconds]);

  //hundreths digit
  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setMinutes(minutes => minutes + 1);
      }, 60000);
      if(minutes > 9) {
        setMinutes(0);
      }
    }else if (!isActive && minutes !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes]);

  //thousandths digit
  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setTenMinutes(tenMinutes => tenMinutes + 1);
      }, 1000000);
      if(tenMinutes > 5) {
        setTenMinutes(0);
      }
    }else if (!isActive && tenMinutes !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, tenMinutes]);

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{tenMinutes}{minutes}:{tenSeconds}{seconds}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button onClick= {() => setHomeScore(homeScore + 7)} className="homeButtons__touchdown">Home Touchdown</button>
          <button onClick= {() => setHomeScore(homeScore + 3)} className="homeButtons__fieldGoal">Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button onClick= {() => setAwayScore(awayScore + 7)} className="awayButtons__touchdown">Away Touchdown</button>
          <button onClick= {() => setAwayScore(awayScore + 3)} className="awayButtons__fieldGoal">Away Field Goal</button>
        </div>
        <div className="quarterButton">
          <button onClick= {() => setQuarter(quarter + 1)}>Quarter</button>
        </div>
        <div className="timerButton">
          <button className= {() => isActive ? 'active' : 'inactive'} onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
        </div>
        <div className="resetTimerButton">
          <button className= "button" onClick={reset}>Reset</button>
        </div>
      </section>
    </div>
  );
}

export default App;
