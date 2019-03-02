import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AdminProvider from './AdminProvider'
import UserProvider from './UserProvider'
import './style.css'




ReactDOM.render(
    <BrowserRouter>
    <AdminProvider>
    <UserProvider>   
        <App/>
    </UserProvider>
    </AdminProvider>
    </BrowserRouter>, 
document.getElementById('root'))