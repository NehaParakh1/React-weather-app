import React, { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const[data,setData]=useState({})
const[location,setLocation]=useState('')
const[temperatureUnit, setTemperatureUnit]=useState('metric')

useEffect(() => {
  const fetchData = async () => {
    if (location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${temperatureUnit}&appid=006862ab30cd6d9df3e8031ebdf10b0d`;
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  fetchData();
}, [location, temperatureUnit]);

const searchLocation = (event) => {
  if (event.key === 'Enter') {
    setLocation(event.target.value);
  }
};

const handleUnitChange = (unit) => {
  setTemperatureUnit(unit);
};

  return (
   <div className="app">
    <div className="search">
    <input value={location} 
    onChange={event=>setLocation(event.target.value)}
    onKeyDown = {searchLocation}
      placeholder='Enter Location'
      type="text"/>
    </div>
    <div className="buttons">
  <button onClick={() => handleUnitChange('metric')}>Celsius</button>
  <button onClick={() => handleUnitChange('imperial')}>Fahrenheit</button>
  <button onClick={() => handleUnitChange('standard')}>Kelvin</button>
</div>
<div className="container">
  <div className="top">
    <div className="location">
      <p>{data.name}</p>
    </div>
    <div className="temp">
    {data.main ? (
  <h1>
    {temperatureUnit === 'metric'
      ? `${data.main.temp.toFixed()}°C`
      : temperatureUnit === 'imperial'
      ? `${data.main.temp.toFixed()}°F`
      : `${data.main.temp.toFixed()} K`}
  </h1>
) : null}
    </div>
    <div className="description">
      {data.weather?<p>{data.weather[0].description}</p>:null}
    </div>

    {data.name!== undefined &&
    <div className="bottom">
     <div className="feels">
{data.main?<p className="bold">{data.main.feels_like.toFixed()}°C</p>:null}
<p>Feels Like</p>
</div>
<div className="humidity">
  {data.main?<p className='bold'>{data.main.humidity}%</p>:null}
  <p>Humidity</p>
</div>
<div className="wind">
  {data.wind?<p className='bold'>{data.wind.speed} mph</p>:null}
  <p>Wind Speed</p>
</div>
    </div>
}

  </div>
</div>
   </div>
  );
}

export default App;
