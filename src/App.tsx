
import './App.css'
import DisplayWeather from './components/displayWeather/DisplayWeather'
import DisplayHourly from './components/displayHourly/DisplayHourly'
import { useState } from 'react'


function App() {
  
  const [city,setCity]=useState("");

  return (
    <>
      <div className="weatherContainer">
        <div className="weatherWrapper">
          <div className="weatherLeftContainer">
            <DisplayWeather setCity={setCity}/>
          </div>
          <div className="weatherRightContainer">
            <DisplayHourly city={city}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
