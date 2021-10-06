import React, { useContext, useEffect } from 'react'
import Loader from './Loader'
import axios from 'axios'
import GlobalContext from '../../context/context'
import { Link } from 'react-router-dom'
import Userwall from './Userwall'
import WallPostForm from './WallPostForm'
import UserContext from '../../context/UserContext'

function UserPage() {
  const { logout } = useContext(GlobalContext)
  const { user, setUser, isLoad, setIsLoad } = useContext(UserContext)


  useEffect(() => {
    userAxios()
  }, [])

  const userAxios = () => {
    setIsLoad(true)
    let token = localStorage.getItem('token')

    axios({
      url: 'http://localhost:5000/user/',
      method: 'get',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {
        //console.log(response.data)
        if (response.data.success === false) {
          logout()
        }

        setUser(response.data.user)
        setIsLoad(false)
      })
      .catch(err => {
        console.log(err)
        logout()
      })
  }

  return (
    <div className="content">
      {isLoad ?
        <Loader />
        : <><div className="user__header">
          <div className="user__photo">Photo</div>
          <div className="user__description">
            <div className="user__name">{user.name} {user.surname}</div>
            <div className="user__biography">{user.biography}</div>
            <div className="user__birthday">{user.birthday}</div>
            <Link to="/settings" className="user__change">Change user info</Link>
          </div>
        </div>
          <WallPostForm user={user} setUser={setUser} />
          <Userwall posts={user.posts} />
        </>
      }
    </div>
  )
}

export default UserPage
