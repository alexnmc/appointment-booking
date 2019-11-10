import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './Context/UserProvider'
import AdminProvider from './Context/AdminProvider'
import JetSkiProvider from './Context/JetSkiProvider'
import './style.css'




ReactDOM.render(
    <BrowserRouter>
        <UserProvider> 
            <AdminProvider>
                <JetSkiProvider>     
                    <App/>
                </JetSkiProvider>
            </AdminProvider>
        </UserProvider>
    </BrowserRouter>, 
document.getElementById('root'))