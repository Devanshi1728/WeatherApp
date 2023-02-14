import React, { useEffect, useState } from "react";
import "./App.css";
import cold from "./assets/cold.avif";
import {getWeatherData} from "./weatherService";
import Description from "./components/Description";
import hot from './assets/hot.jpg';

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Junagadh');
  const [units, setUnits] = useState('metric');
  const [bg, setImage] = useState(hot);

  useEffect(() =>  {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);
      
      const bgTemp = units === 'metric' ? 20 : 60;
      if(data.temp <= bgTemp) setImage(cold);
      else setImage(hot);
    }
    fetchWeatherData();
  }, [city, units]);

  const handleUnits = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1)
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  }
  
  const enterKeyPressed = (e) => {
    console.log(e.keyCode)
    if(e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        { weather && (<div className="container">
          <div className="section section__inputs">
            <input 
              type="text" 
              name="city" 
              placeholder="Enter City" 
              onKeyDown={enterKeyPressed}
            />
            <button onClick={e => handleUnits(e)}>°F</button>
          </div>

            <div className="section section__temprature">
              <div className="icon">
                <h3>{`${weather?.name},${weather?.country}`}</h3>
                <img
                  src={weather?.iconURL}
                  alt="weather"
                  width="50px"
                  height="50px"
                />
                <h3>{weather?.description}</h3>
              </div>
              <div className="temprature">
                <h1>{`${weather?.temp.toFixed()} 
                ${units === 'metric' ? ' °C' : ' °F'}`}</h1>
              </div>
            </div>
            <Description weather={weather} units={units} />
        </div>)}
      </div>
    </div>
  );
}

export default App;
