import { useState } from 'react'
import Button from './components/Button'
import Section from './components/Section'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = (good / all) * 100

  const handleGood = () => {
    setGood(n => n + 1)
  }
  

  const handleNeutral = () => {
    setNeutral(n => n + 1)
  }

  const handleBad = () => {
    setBad(n => n + 1)
  }

  return (
    <>
    <Section text="give feedback"/>
    <Button handleClick={handleGood} text="good" />
    <Button handleClick={handleNeutral} text="neutral" />
    <Button handleClick={handleBad} text="bad" />
    <Section text="statistics"/>
<Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
   

    </>
  )
}

export default App
