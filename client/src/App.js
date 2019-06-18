import React, { Component } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import About from  './About'
import Contact from './Contact'
import Admin from './Admin'
import AdminPortal from './AdminPortal'
import {withAdmin} from './Context/AdminProvider'
import ProtectedRoutes from './ProtectedRoutes'



class App extends Component {
    render(){
        return (
           
            
    //if there is a token in the local storage(or state) the  Admin component redirects to the AdminPortal component autoomatically
            <div>
                <Navbar token = {localStorage.getItem("token2")} />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                    <Route exact path="/admin" render = {props => localStorage.getItem("token2") ? <Redirect to="/adminportal"/> : <Admin {...props}/>}/>
                    <ProtectedRoutes
                        redirectTo="/admin"
                        component={AdminPortal}  // prevents users access to the adminportal by typing in the url in the browser
                        token={localStorage.getItem("token2") }
                        path="/adminportal"
                    />
                
                </Switch>
            </div>
        )
    }
}

export default withAdmin(App)