import React from 'react'
import Country from './Country';

const Display = (props) => {
    const { searchTerm, countryList, handlerFunc } = props

    if (searchTerm !== '') {

        const searchTermLower = searchTerm.toLowerCase()

        const matched = countryList.filter((country) => {
            if (country.name.toLowerCase().indexOf(searchTermLower) !== -1) {
                return true
            } else
                return false
        })

        const countryCount = Object.keys(matched).length

        if (countryCount === 1) {
            return (<Country countryData={matched[0]} />)
        } else if (countryCount < 10) {
            return (
                matched.map(country =>
                    < p key={country.name} >
                        {country.name}
                        <button value={country.name} onClick={handlerFunc}>show</button>
                    </p >
                )
            )
        } else {
            return (
                <p>too many matches, specify another filter</p>
            )
        }

    } else {
        return (
            <p>search for country</p>
        )
    }

}

export default Display