const Total = ({parts}) => {

const totalExercises = parts.reduce((prev,current) => {
    console.log(prev)
    return prev + current.exercises
},0)

  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

export default Total