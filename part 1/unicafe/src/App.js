import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>

  )
}

const App = () => {
  const [click, setClick] = useState({ Good: 0, Neutral: 0, Bad: 0, All: 0 })

  const addGood = () => {
    setClick({
      ...click,
      Good: click.Good + 1,
      All: click.All + 1

    })
  }
  const addNeutral = () => {
    setClick({
      ...click,
      Neutral: click.Neutral + 1,
      All: click.All + 1
    })
  }
  const addBad = () => {
    setClick({
      ...click,
      Bad: click.Bad + 1,
      All: click.All + 1
    })
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={addGood} text={'good'} />
      <Button handleClick={addNeutral} text={'neutral'} />
      <Button handleClick={addBad} text={'bad'} />
      {click.All === 0
        ?
        <p>No feedback given</p>
        :
        <div>
          <h2>statistics</h2>
          <table>
            <tbody>
              <Statistics text='good' value={click.Good} />
              <Statistics text='neutral' value={click.Neutral} />
              <Statistics text='bad' value={click.Bad} />
              <Statistics text='all' value={click.All} />
              <Statistics text='average' value={(click.Good - click.Bad) / click.All} />
              <Statistics text='positive' value={(click.Good / click.All) * 100} />
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default App;