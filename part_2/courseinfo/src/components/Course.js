const Part = (props) => {
    return (
      <p>{props.name} {props.exercise}</p>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => (
          <Part key={part.id} name={part.name} exercise={part.exercises} />
        ))}
      </div>
    )
  }
  
  const Total = (props) => {
    const { parts } = props
    // console.log(parts);
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
      <div>
        <strong>
          Total {total} exercises
        </strong>
      </div>
    )
  }
  
  
  const Header = (props) => {
    return (
      <h1>
        {props.name}
      </h1>
    )
  }
  
  const Course = (props) => {
    const { course } = props
    return (
      <>
      
          <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
      
      </>
    )
  }

  export default Course