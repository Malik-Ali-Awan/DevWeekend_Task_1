import React, { useEffect, useState } from 'react'
import Search from '../search'

const apiKey = import.meta.env.VITE_API_KEY;

const Weather = () => {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherdata, setWeatherdata] = useState(null);
  
  async function fetchWeatherData(param) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${apiKey}`);
   
        const data = await res.json();
   
        console.log('data', data);

        return data;
        
    } catch (error) {
        console.log(error)
    }
  }

  async function handleSearch(){
    try {
        setLoading(true);
        const data = await fetchWeatherData(search);
        setLoading(false);
        setWeatherdata(data);

        
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    const fun = async() => {
      setLoading(true);
      const data = await fetchWeatherData('Islamabad');
      setLoading(false);
      setWeatherdata(data);
    }

    fun();


  }, [])

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }




  return (
    <div>
        <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        />
        {
          loading? 
          <div>Loading...</div>:
          <div>
            <div className="city-name">
                <h2>{weatherdata?.name}, <span>{weatherdata?.sys?.country}</span></h2>
            </div>

            <div className="date">
              <span>{getCurrentDate()}</span>
            </div>

            <div>
              {weatherdata?.main?.temp}
            </div>

            <p className="description">
                {
                  weatherdata && weatherdata.weather && weatherdata.weather[0]? weatherdata.weather[0].description: ''
                }
            </p>

            <div className="weather-info">
              <div>
                <div>
                  <p className='wind'>
                    {weatherdata?.wind?.speed}
                  </p>
                  <p>Wind speed</p>
                </div>
              </div>

              <div>
                <div>
                  <p className='humidity'>
                    {weatherdata?.main?.humidity}%
                  </p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          </div>
        }
        Weather
    </div>
  )
}


export default Weather