import React, { Fragment } from 'react'
import { withAdmin } from './Context/AdminProvider'





const Admin = props=>  {
    
        return (
            <Fragment>
                <div className="admin">
                { props.toggle2 ?
                    <div className = "logInA">
                        <div className = 'login2'>
                            <form onSubmit={props.handleLogin2} className='loginForm'>
                                <h4>Admin only:</h4>
                                <input
                                    className = "login1"
                                    type='text'
                                    name='username'
                                    placeholder='Username'
                                    value={props.username}
                                    onChange={props.handleChange2}
                                />

                                <input
                                    className = "login1"   
                                    type='text'
                                    name='password'
                                    placeholder='Password'
                                    value={props.password}
                                    onChange={props.handleChange2}
                                />
                                <button className = 'loginButton'>Login</button>
                            </form>
                            <button className='signupButton2' onClick={props.editToggler}>Sign up</button>
                        </div>
                    </div>
                        
                    :     

                    <div className = "adminContainer">
                        <form onSubmit={props.handleSignup} className='signUpAdmin'>
                        <h4>Sign Up:</h4>
                       
                            <input
                                className = "login1"
                                type='text'
                                name='adminCode'
                                placeholder='enter code'
                                value={props.adminCode}
                                onChange={props.handleChange2}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='username'
                                placeholder='enter a username'
                                value={props.username}
                                onChange={props.handleChange2}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='password'
                                placeholder='choose your password'
                                value={props.password}
                                onChange={props.handleChange2}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='password2'
                                placeholder='repeat password'
                                value={props.password2}
                                onChange={props.handleChange2}
                            />
                            <button className = 'loginButton'>Sign up</button>
                        </form>
                            <button className = 'signupButton2' onClick={props.editToggler}>Log in</button>
                    </div>
                }
                </div>
            </Fragment>
        )
    
}

export default withAdmin(Admin)