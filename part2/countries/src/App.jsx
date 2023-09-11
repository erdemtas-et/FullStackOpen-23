import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import ListCountry from './components/ListCountry'
import useFetch from './services/useFetch'
import Country from './components/Country'

function App() {
  const [filterValue, setFilterValue] = useState("")
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)


  console.log(import.meta.env.VITE_SOME_KEY)
  useEffect(() => {
    useFetch("https://restcountries.com/v3.1/all")
      .then(data => data.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase())))
      .then(filtered => setCountries(filtered))
  }, [filterValue])

 

  const handleDetails = (country) => selectedCountry === country ? setSelectedCountry(null): setSelectedCountry(country)

  if (!countries) {
    return null
  }

  return (
    <>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      {countries.length <= 10 && filterValue !== "" && countries.length !== 1 && countries.map(country => {
        return (
          <div key={country.name.common}>
            <ListCountry
              country={country}
              handleDetails={() => handleDetails(country)}
              label={selectedCountry === country ? "close" : "show"}
            />
            {selectedCountry === country && <Country country={country} />}
          </div>
        )
      })}
      {countries.length > 10 && filterValue !== "" && <p>too many countries</p>}

      {countries.length === 1 && filterValue !== "" && <Country country={countries[0]} />}

    </>
  )
}

export default App
