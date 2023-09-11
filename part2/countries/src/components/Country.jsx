import React,{useEffect,useState} from 'react'
import useFetch from '../services/useFetch'
const Country = ({country}) => {

    const languageArray = Object.values(country.languages)
    
    const [weatherData,setWeatherData] = useState(null)

    useEffect(() => {
       
        useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${import.meta.env.VITE_SOME_KEY}&units=metric`)
        .then(data => setWeatherData(data))
    },[country])

  
    
  return (
    <div>
    <h1>{country.name.common}</h1>

    <p>capital: {country.capital}</p>
    <p>area: {country.area}</p>

    <h4>languages: </h4>

    {languageArray.map(language => {
       return <li key={language}>{language}</li>
    })}
    
    <img width="150px" src={country.flags.png} alt={country.flags.alt}/>

    
    {weatherData && <div>
        <h2>Weather in {country.capital}</h2>
      <p>temperature :  {weatherData.main.temp}</p> 
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
      <p>wind {weatherData.wind.speed} m/s</p>
        </div>}

    </div>
  )
}

export default Country