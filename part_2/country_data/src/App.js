import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Display from './components/Display';
import Input from './components/Input';



const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {

    //for online - main server
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('country fetch complete');
        setCountries(response.data)
      })

    //for offline purpose - dev server
    // axios
    //   .get('http://localhost:3001/all')
    //   .then(response => {
    //     console.log('country fetch complete');
    //     setCountries(response.data)
    //   })

  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div>
      <Input searchValue={search} handlerFunc={handleSearch} />
      <Display searchTerm={search} countryList={countries} handlerFunc={handleSearch} />

    </div>)
}

export default App