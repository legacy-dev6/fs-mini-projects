import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.clickHandle}>{props.text}</button>
  )
}

const Anecdote = (props) => {
  const { title, func, votes, index } = props

  return (
    <div>
      <h2>{title}</h2>
      <p>{func[index]}</p>
      <p>has {votes[index]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const copy = [...points]

  const randomNumber = () => {
    const min = 0
    const max = 7
    return (
      Math.floor(Math.random() * (max - min) + min)
    )
  }

  const anecSelect = () => {
    setSelected(randomNumber())
  }
  const anecVote = () => {
    copy[selected] += 1
    setPoints(copy)
  }

  const indexOfMax = () => {
    if (copy.length === 0) {
      return -1
    }
    let max = 0
    let maxIndex = 0
    // console.log(copy.length);

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] > max) {
        max = copy[i]
        maxIndex = i
      }
    }
    return maxIndex
  }


  return (
    <div>
      {/* {console.log(points)} */}
      {/* {console.log('anecdote:',selected)} */}
      {/* <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
    <p>has {points[selected]} votes</p> */}
      <Anecdote title={'Anecdote of the day'} func={anecdotes} votes={points} index={selected} />

      <Button clickHandle={anecVote} text='vote' />
      <Button clickHandle={anecSelect} text='next anecdote' />

      <Anecdote title={'Anecdote with most votes'} func={anecdotes} votes={points} index={indexOfMax()} />

      {/* <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexOfMax()]}</p>
      <p>has {points[indexOfMax()]} votes</p> */}
    </div>
  )
}

export default App;
