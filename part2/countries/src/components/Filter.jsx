import React from 'react'

const Filter = ({filterValue,setFilterValue}) => {

const handleChange = (e) => {
    const {value} = e.target
    console.log(value)
    setFilterValue(value)
}

  return (
    <div>
    <span>find countries</span>
    <input type='text' value={filterValue} onChange={handleChange} />
    </div>
  )
}

export default Filter