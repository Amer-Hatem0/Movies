import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import {regSchema} from '../schemas/register.jsx'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  let [error, setError] = useState([]);
  let navigate = useNavigate()
  let {errors, values , handleChange ,handleSubmit , touched ,handleBlur} = useFormik({
    initialValues:{
      email:"",
      name:"",
      password:"",
      cPassword:""
    }, validationSchema: regSchema,
    onSubmit: sendRegisterData,

  })

  async function sendRegisterData(values) {

    let { data } = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup', values)
    // .catch((err) => {
    //   setStutasErrors(err.message.data.message);
    // })
    if (data.message == 'success') {
      console.log('welcome');
      navigate('/Login')
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
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input type="text" value={values.name} onChange={handleChange}  onBlur={handleBlur} className={`form-control ${errors.name && touched.name?"is-invalid":""}`} id="exampleInputName" name='name' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className={`form-control ${errors.password && touched.password?"is-invalid":""}`} value={values.password} onBlur={handleBlur} onChange={handleChange}  name='password' id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input type="password" className={`form-control ${errors.cPassword && touched.cPassword?"is-invalid":""}`} name='cPassword'value={values.cPassword}  onBlur={handleBlur} onChange={handleChange}  id="exampleInputPassword2" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </>
  )
}
