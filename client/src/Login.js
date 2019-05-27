import React from 'react'
import {withUser} from './Context/UserProvider'



const Login = (props) => {
    
    return (
        <div className = "homeContainer">
        {props.toggle ?
            <div className = 'logIn'>
                <h2 className = 'rent'>Jet Ski Rental</h2>
                <h2>Kawasaki - Honda - Bombardier</h2>
                <div className = 'login2'>
                    <form  onSubmit = {props.handleLogin}className='loginForm'>
                        <h4>Bookings here:</h4>
                        <input
                            className = "login1"
                            type ='text'
                            name ='username'
                            placeholder  ='Username:'
                            value = {props.username}
                            onChange= {props.handleChange}
                        />
            
                        <input
                            className = "login1"
                            type ='text'
                            name ='password'
                            placeholder ='Password:'
                            value = {props.password}
                            onChange = {props.handleChange}
                        />
            
                        <button className = 'loginButton'>Login</button>
                    </form>
                    <button className ='signupButton' onClick = {props.editToggler2}>Sign up</button>
                </div>
            </div>
            
            :

            <div className = 'logIn'>
                <h2 className = 'rent'>Jet Ski Rental</h2>
                <h2>Kawasaki - Honda - Bombardier</h2>
                <div className = 'login2'>
                    <form onSubmit={props.handleSignup} className='loginForm'>
                        <h4>Sign Up:</h4>
                        <input
                            className = "login1"
                            type='text'
                            name='username'
                            placeholder ='enter a username:'
                            value ={props.username}
                            onChange ={props.handleChange}
                        />
                
                        <input
                            className = "login1"
                            type ='text'
                            name ='password'
                            placeholder ='choose your password:'
                            value = {props.password}
                            onChange = {props.handleChange}
                        />
                
                        <input
                            className = "login1"
                            type ='text'
                            name ='password2'
                            placeholder ='repeat password:'
                            value = {props.password2}
                            onChange = {props.handleChange}
                        />
                        <button className = 'loginButton'>Sign up</button>
                    </form>
                        <button className = 'signupButton' onClick = {props.editToggler2}>Login</button>
                </div>
            </div>
        }
    </div>
    )
}
    


export default withUser(Login)























 

