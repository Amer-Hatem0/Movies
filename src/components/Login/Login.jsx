import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {logSchema} from '../schemas/login.jsx'
export default function Login({getUser}) {
  let [error, setError] = useState([]);
  let navigate = useNavigate()
  let {errors, values , handleChange ,handleSubmit , touched ,handleBlur} = useFormik({
    initialValues: {
      email: "",
     
      password: ""
  
    }, validationSchema: logSchema,
    onSubmit: sendRegisterData,

  })

  async function sendRegisterData(values) {

    let { data } = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin', values)
    if (data.message === 'success') {
      console.log('registred');
      localStorage.setItem('token', data.token)
      getUser()
      navigate('/')
    } else {
      setError(data.err[0]);
    }
  
  }
  return (
    <>
     
      <form className='w-50 m-auto mt-5 ' onSubmit={handleSubmit}>
        {error.map((err) => {
        return <div className='alert alert-danger'>{err.message}</div>
      })} 
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email"  value={values.email} onChange={handleChange} onBlur={handleBlur} className={`form-control ${errors.email && touched.email?"is-invalid":""}`} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" />
      
        
        </div>
      
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className={`form-control ${errors.password && touched.password?"is-invalid":""}`} value={values.password} onBlur={handleBlur} onChange={handleChange}  name='password' id="exampleInputPassword1" />
        </div>
      

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </>
  )
}
