import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AdminProvider from './AdminProvider'
import './style.css'
import UserProvider from './UserProvider'

ReactDOM.render(
    <BrowserRouter>
    <UserProvider>
    <AdminProvider>
        <App/>
    </AdminProvider>
    </UserProvider>
    </BrowserRouter>, 
document.getElementById('root'))