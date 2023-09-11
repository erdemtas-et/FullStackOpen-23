const Total = ({parts}) => {
const totalExercises = parts.reduce((prev,current) => {
    console.log(prev)
    return prev + current.exercises
},0)

  return (
    <p><strong>Number of exercises {totalExercises}</strong></p>
  )
}

export default Total