import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'
export default function Layout({user , setUser}) {
  let navigate = useNavigate()
  function logout(){
    localStorage.removeItem('token')
    setUser(null)
    navigate('/Login')
  }
  return (
   <>
   <Navbar user={user} logout={logout} />
   <div className="">
<Outlet></Outlet></div>
   <Footer />
   </>
  )
}
