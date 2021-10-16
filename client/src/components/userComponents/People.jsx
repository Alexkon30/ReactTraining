import React, { useContext, useState, useEffect, useRef } from 'react'
import Loader from './Loader'
import GlobalContext from '../../context/GlobalContext'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import Person from '../UI/Person'

function People() {
  const { logout } = useContext(GlobalContext)
  const { isLoad, setIsLoad } = useContext(UserContext)
  const [people, setPeople] = useState([])

  useEffect(() => {
    usersAxios()
  }, [])

  function usersAxios() {
    setIsLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://localhost:5000/user/people/',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.authError === true) {
          console.log(response.data.message)
          logout()
        }
        setIsLoad(false)
        setPeople(response.data.users)
      })
      .catch(err => {
        console.log(err.response.data.message)
        logout() //
      })
  }

  return (
    <div className="content">
      {isLoad ?
        <Loader />
        : <>
          <div className="search">
            search..
          </div>
          <div className="people__list">
            {people.length
              ? people.map((person, index) => <Person key={index} {...person} />)
              : <div>No people</div>}
          </div>
        </>
      }
    </div>
  )
}

export default People
