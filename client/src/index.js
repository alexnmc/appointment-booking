import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AdminProvider from './AdminProvider'
import './style.css'

ReactDOM.render(
    <BrowserRouter>
    <AdminProvider>
        <App/>
    </AdminProvider>
    </BrowserRouter>, 
document.getElementById('root'))