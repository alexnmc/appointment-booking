import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './UserProvider'
import AdminProvider from './AdminProvider'
import './style.css'




ReactDOM.render(
    <BrowserRouter>
    <UserProvider>   
    <AdminProvider>
        <App/>
    </AdminProvider>
    </UserProvider>   
    </BrowserRouter>, 
document.getElementById('root'))