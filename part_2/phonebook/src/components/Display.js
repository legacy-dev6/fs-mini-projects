import React from 'react'

const Display = (props) => {
  const { persons, searchTerm, handlerDelete } = props

  if (searchTerm !== '') {

    const searchTermLower = searchTerm.toLowerCase()

    const filterPerson = persons.filter((person => {
      if (person.name.toLowerCase().indexOf(searchTermLower) !== -1) {
        return true
      } else {
        return false
      }
    }))

    return (
      <ul>
        {filterPerson.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button value={person.id} onClick={handlerDelete} >delete</button>
          </li>
        )}
      </ul>
    )

  } else {
    return (
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button value={person.id} onClick={handlerDelete} >delete</button>

          </li>
        )}
      </ul>
    )
  }
}


export default Display