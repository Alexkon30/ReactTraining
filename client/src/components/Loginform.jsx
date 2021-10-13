import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import Formfooter from './UI/Formfooter';
import Input from './UI/Input';
import axios from 'axios';

function Loginform() {

  const { form, setForm, setMode, login } = useContext(GlobalContext);

  const loginAxios = body => {
    axios.post('http://localhost:5000/login', body)
      .then(response => {
        // console.log(response)
        if (response.data.success) {
          login(response.data.token, JSON.stringify({ username: response.data.username }))
        }
      })
      .catch(err => console.log(err))
  }

  // eslint-disable-next-line
  // const loginFetch = body => {
  //   fetch('http://localhost:5000/login', {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       if (result.success) {
  //         login(result.token, result.user)
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  useEffect(() => {
    setMode('login');
    setForm({
      username: '',
      email: '',
      password: '',
      confirmedPass: '',
      agreement: false
    });
    // eslint-disable-next-line
  }, []);


  return (
    <div className="loginform">
      <div className="loginform__header">Login</div>
      <div className="loginform__body">
        <Input
          input={{
            type: "text",
            value: form.email,
            onChange: (e) => setForm({ ...form, email: e.target.value }),
            autoComplete: "off",
            // autoFocus: true
          }}
          label="Email"
          name="user_email"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "password",
            value: form.password,
            onChange: (e) => setForm({ ...form, password: e.target.value })
          }}
          label="Password"
          name="user_password"
          className="loginform__body__field"

        />
        <button className="loginform__btn" onClick={() => loginAxios(form)}>Login</button>
      </div>
      <Formfooter
        block="loginform"
        text="Don't have an account?"
        href="/register"
        linkText="Registration"
      />
    </div>
  )
}

export default Loginform;
