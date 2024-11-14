import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Product from './components/Product/Product'
import jwtDecode from 'jwt-decode'
import Prodected from './components/Prodected/Prodected'


 export default function App() {


let [user, setUser] = useState(null)
function getUser() {
  let token = localStorage.getItem('token')
  let usr = jwtDecode(token)
  setUser(usr)
}
useEffect(()=>{
  if(localStorage.getItem('token')){
    getUser()
  }
},[])
let routers = createBrowserRouter([
  {
    path: '', element: <Layout user={user} setUser={setUser} />, children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login getUser={getUser} /> },
      // { path: 'product', element:<Prodected><Product /></Prodected>  },
      { path: 'product', element: <Product />   },
      { path: '*', element: <Notfound /> },
    ]
  }
])
  return (
    <RouterProvider router={routers} ></RouterProvider>
  )
}
