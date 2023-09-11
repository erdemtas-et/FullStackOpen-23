import React from 'react'

const ListCountry = ({country,handleDetails,label}) => {
  return (
    <div >
    <p style={{"display":"inline-block"}} key={country.name.common}>{country.name.common}</p>
   <button onClick={handleDetails}>{label}</button>
   </div>
  )
}

export default ListCountry