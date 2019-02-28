import React, {Component} from 'react'
import axios from 'axios'
import data from './time.json'
import {withUser} from './UserProvider'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            date: '',
            time: '',      //we store all the data from the inputs here and after that we send it to the database
            name: '',
            email: '',
            phone: '',
            
        }
    }

    handleSubmit = (e) => {  // on submit we are sending a new booking object to the database
        e.preventDefault()
        console.log(this.state.date)
        const {date, time, name, email, phone} = this.state
        axios.post(`/bookings/${this.state.date}`, {date, time, name, email, phone}).then(res => {
            
                   alert(res.data +' Date: '+ date +'  from '+ time)
        })
        this.setState({
            date: '',
            time: '',   // reseting all the inputs to be empty after submit
            name: '',   
            email: '',
            phone: '',
            
        })
    }

    
    
    handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name]: value
        })

    }

    

    render(){

        let name = this.props.user.username
        return(
            <div className = "home">
            
            { this.props.token ?
                
                <div className='bookingContainer'>
                 
                    <form onSubmit={this.handleSubmit} className = 'bookingForm'>
                    <p>{`Hello ${name ? name.toUpperCase() : "Hello"} !`}</p>
                        <p>Book your adventure:</p>
                        <input className = "date"
                            type='date' 
                            name='date'
                            value={this.state.date} 
                            onChange={this.handleChange}
                            required
                            />
                        <select 
                            required 
                            aria-required="true" 
                            name='time'
                            value={this.state.time}
                            onChange={this.handleChange}>
                            <option value = ''>Choose a Time</option>
                            {data.time.map((time, index) => <option key={time} value={time} className = {index}>{time}</option>)}
                        </select>
                        <input 
                            type='text'
                            name='name'
                            placeholder='Name of Renter'
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                            />
                        <input 
                            type='email'
                            name='email'
                            placeholder='Your Email Address'
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                            />
                        <input 
                            type='number'
                            name='phone'
                            placeholder='Phone Number'
                            value={this.state.phone}
                            onChange={this.handleChange}
                            required
                            />
                        <button>Submit</button>
                        <button className = "button" onClick = {this.props.logout}>Log out </button>
                   
                    </form>
                   
                </div>

                :
                
                <div>
                    <h2>Professional  jet ski  racing!</h2>
                { this.props.toggle ?
                    <div className = 'logIn'>
                        <form onSubmit={this.props.handleLogin} className='loginForm'>
                            <h4>Bookings here:</h4>
                            <input
                                type ='text'
                                name ='username'
                                placeholder  ='Username:'
                                value = {this.props.username}
                                onChange= {this.props.handleChange}
                            />

                            <input
                                type ='text'
                                name ='password'
                                placeholder ='Password:'
                                value = {this.props.password}
                                onChange = {this.props.handleChange}
                            />

                            <button>Login</button>
                            
                        </form>
                        <button className ='signupButton' onClick = {this.props.editToggler}>Sign up</button>
                    </div>
                    
                    :
                    
                    <form onSubmit={this.props.handleSignup} className='signUp'>
                         <h4>Sign Up:</h4>
                        
                        <input
                            type='text'
                            name='username'
                            placeholder ='enter a username:'
                            value ={this.props.username}
                            onChange ={this.props.handleChange}
                        />

                        <input
                            type ='text'
                            name ='password'
                            placeholder ='choose your password:'
                            value = {this.props.password}
                            onChange = {this.props.handleChange}
                        />
                        <button>Sign up</button>
                    </form>
            }
            </div>
            }
                  
            </div>
        )
    }
}

export default withUser(Home)