import Part from "./Part"
const Content = ({parts}) => {
  return (
    <>
    <Part course={parts[0]} />
    <Part course={parts[1]} />
    <Part course={parts[2]} />
    </>
  )
}

export default Content