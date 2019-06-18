import React, { Component, Fragment } from 'react'
import { withAdmin } from './Context/AdminProvider'





class Admin extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            password2: '',
            toggle: true,
            adminCode: ''
        }
    }

    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle, //toggle from login to signin
                username: '',
                password: '',
                password2: '',
                adminCode: ''
            }
        })
    }

    handleLogin = (e) => {   // login method, we send the username and password entered in the input fields to the database 
        e.preventDefault()
        const newAdmin = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login2(newAdmin) // we are receiving this function from the context and we call it here 
        this.setState({
            username: '',
            password: ''
        })
    }

    adminSignup = () => {
        const newAdmin = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.signup2(newAdmin)
        this.setState({
            username: '',
            password: '',
            password2:'',
            adminCode:''
        })
    }
    
    handleSignup = (e) => {
        e.preventDefault()
        this.state.password === this.state.password2 ?    
            this.state.adminCode === process.env.REACT_APP_CODE ?
                this.adminSignup()
                :
                this.state.adminPassword === "" ? 
                    alert("please enter secret code: vschool")
                    :
                    alert("wrong code")
        :
        alert('passwords does not match')
    }

    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }


    render() {
        return (
            <Fragment>
                <div className="admin">
                { this.state.toggle ?
                    <div className = "logInA">
                        <div className = 'login2'>
                            <form onSubmit={this.handleLogin} className='loginForm'>
                                <h4>Admin only:</h4>
                                <input
                                    className = "login1"
                                    type='text'
                                    name='username'
                                    placeholder='Username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />

                                <input
                                    className = "login1"   
                                    type='text'
                                    name='password'
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <button className = 'loginButton'>Login</button>
                            </form>
                            <button className='signupButton2' onClick={this.editToggler}>Sign up</button>
                        </div>
                    </div>
                        
                    :     

                    <div className = "adminContainer">
                        <form onSubmit={this.handleSignup} className='signUpAdmin'>
                        <h4>Sign Up:</h4>
                       
                            <input
                                className = "login1"
                                type='text'
                                name='adminCode'
                                placeholder='enter code'
                                value={this.state.adminCode}
                                onChange={this.handleChange}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='username'
                                placeholder='enter a username'
                                value={this.state.username}
                                onChange={this.handleChange}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='password'
                                placeholder='choose your password'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />

                            <input
                                className = "login1"
                                type='text'
                                name='password2'
                                placeholder='repeat password'
                                value={this.state.password2}
                                onChange={this.handleChange}
                            />
                            <button className = 'loginButton'>Sign up</button>
                        </form>
                            <button className = 'signupButton2' onClick={this.editToggler}>Log in</button>
                    </div>
                }
                </div>
            </Fragment>
        )
    }
}

export default withAdmin(Admin)