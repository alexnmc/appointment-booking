import React, { Component, Fragment } from 'react'
import { withAdmin } from './AdminProvider'

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            toggle: true,
            adminPassword: ''
        }
    }

    
    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle  //toggle from login to signin
            }
        })
    }


    handleLogin = (e) => {   // login method, we send the username and password entered in the input fields to the database 
        e.preventDefault()
        const newAdmin = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.login(newAdmin) // we are receiving this function from the context and we call it here 

        this.setState({
            username: '',
            password: ''
        })
    }


    
    handleSignup = (e) => {
        e.preventDefault()
       
        if (this.state.adminPassword === process.env.REACT_APP_CODE) {
            
            const newAdmin = {
                username: this.state.username,
                password: this.state.password
            }

            this.props.signup(newAdmin)

            this.setState({
                username: '',
                password: '',
            })

        } else {
            if(this.state.adminPassword === "") {
                alert("please enter secret code: vschool")
            } else {
                alert("wrong code")
            }
        }
        this.editToggler()
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
                        <div className = 'logIn2'>
                            <form onSubmit={this.handleLogin} className='loginForm'>
                                <h4>Admin only:</h4>
                                <input
                                    type='text'
                                    name='username:'
                                    placeholder='Username:'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />

                                <input
                                    type='text'
                                    name='Password:'
                                    placeholder='Password:'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />

                                <button>Login</button>
                            </form>
                            <button className='signupButton' onClick={this.editToggler}>Sign up</button>
                        </div>
                        :
                        <form onSubmit={this.handleSignup} className='signUp2'>
                       
                            <input
                                type='text'
                                name='adminPassword'
                                placeholder='enter secret code:'
                                value={this.state.adminPassword}
                                onChange={this.handleChange}
                            />

                            <input
                                type='text'
                                name='username'
                                placeholder='enter a username:'
                                value={this.state.username}
                                onChange={this.handleChange}
                            />

                            <input
                                type='text'
                                name='password'
                                placeholder='choose your password:'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <button>Sign up</button>
                        </form>
                }
                </div>
            </Fragment>
        )
    }
}

export default withAdmin(Admin)