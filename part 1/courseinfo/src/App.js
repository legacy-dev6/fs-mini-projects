import React from 'react'

const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => (
        <Part name={part.name} exercise={part.exercises} />
      ))}
    </div>
  )
}

const Total = (props) => {
  let sum = 0
  return (
    <div>
      <p>Number of exercises {props.exercises.forEach(element => {
        sum += element.exercises
      })
      }
        {sum}
      </p>
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

export default App