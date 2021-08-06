import React, { useEffect, useState } from "react";
import Display from "./components/Display";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import servicePersons from "./services/persons";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  useEffect(() => {
    servicePersons
      .getAll()
      .then((allPersons) => {
        setPersons(allPersons);
      })
      .catch((error) => {
        setErrorNotification(
          "unable to load names from server. please try again later.!!"
        );
        setTimeout(() => setErrorNotification(null), 5000);
      });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const nameDuplicate = persons.some((person) => person.name === newName);
    const numDuplicate = persons.some((person) => person.number === newNumber);

    if (newName === "") {
      window.alert(`name cannot be empty`);
    } else if (newNumber === "") {
      window.alert(`number cannot be empty`);
    } else if (numDuplicate === true) {
      window.alert(`${newNumber} is already added to phonebook`);
    } else if (nameDuplicate === true) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with ${newNumber} ?`
        )
      ) {
        const copyPerson = persons.find((person) => person.name === newName);

        const personObject = {
          name: newName,
          number: newNumber.toString(),
        };
        servicePersons
          .update(copyPerson.id, personObject)
          .then((updateResponse) => {
            setPersons(
              persons.map((person) =>
                person.name === newName ? updateResponse.data : person
              )
            );
            setNotification(`Updated ${newName}`);
            setTimeout(() => setNotification(null), 5000);
          })
          .catch((error) => {
            if (error.response) {
              setErrorNotification(`Information of '${newName}' has already been removed from server`);
              setTimeout(() => setErrorNotification(null), 5000);
              setPersons(persons.filter((person) => person.name !== newName));
            } else {
              setErrorNotification(`Something went wrong! Failed to update '${newName}'.`);
              setTimeout(() => setErrorNotification(null), 5000);
            }
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber.toString(),
      };
      servicePersons
        .create(personObject)
        .then((person) => {
          setPersons(persons.concat(person));
          setNotification(`Added '${newName}'`);
          setTimeout(() => setNotification(null), 5000); // i made it short. setTimeout(() => { setNotification(null) }, 5000)
        })
        .catch((error) => {
          setErrorNotification(
            `Error.!! failed to add '${newName}' to the server, please try again later`
          );
          setTimeout(() => setErrorNotification(null), 5000);
        });

      setNewName("");
      setNewNumber("");
    }
  };

  const deleteEntry = (entryId) => {
    const copyPerson = persons.find((person) => person.id + "" === entryId);

    if (window.confirm(`Delete '${copyPerson.name}'?`)) {
      servicePersons
        .remove(entryId)
        .then(() => {
          setPersons(persons.filter((person) => person.id + "" !== entryId)); // person.id+'' is for converting id to string for comparison
          setNotification(`Deleted '${copyPerson.name}'`);
          setTimeout(() => setNotification(null), 5000);
        })
        .catch((error) => {
          setErrorNotification(`Error!!, Unable to delete '${copyPerson.name}'.`);
          setTimeout(() => setErrorNotification(null), 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (event) => {
    deleteEntry(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorNotification message={errorNotification} />
      <Filter searchValue={searchTerm} handlerFunc={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm
        nameValue={newName}
        numValue={newNumber}
        nameHandler={handleNameChange}
        numHandler={handleNumberChange}
        submitFunc={addName}
      />

      <h2>Numbers</h2>
      <Display
        persons={persons}
        searchTerm={searchTerm}
        handlerDelete={handleDelete}
      />
    </div>
  );
};

export default App;
