import React, {Component} from 'react'
import axios from 'axios'
import data from './time.json'
import {withUser} from './UserProvider'
import moment from 'moment'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            date: '',
            time: '',      //we store all the data from the inputs here and after that we send it to the database
            name: '',
            email: '',
            phone: '',
            toggle: true,
            booking: {},
            booking2: {}
           
            
            
        }
    }

    
    handleSubmit = (e) => {  // on submit we are sending a new booking object to the database
        e.preventDefault()
       
        const updates = {
            date: this.state.date,
            time: this.state.time,    
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
         }

        axios.put(`/user/${this.props.user.username}`, updates).then(res => {
            
            alert('You are booked on:  Date: '+ this.state.date +'  from '+ this.state.time)
                  
                  this.setState({
                    date: '',
                    time: '',   // reseting all the inputs to be empty after submit
                    name: '',   
                    email: '',
                    phone: '',
                    booking:res.data,
            })
                   
        })
        
    }

    
    
    handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name]: value
        })

    }

    
    
    
    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle  
            }
        })
        this.showBooking()
       
    }


    
    showBooking = () => {
        
        axios.get(`/user/${this.props.user.username}`).then(res => { 
            console.log(res.data)
        this.setState({
                booking2: res.data,
               
            })
        })
    }
    
    

    render(){
       
    
        return(
            <div className = "home">
            
            { this.props.token ?
                <div>
                { this.state.toggle ?
                
                    <div className='bookingContainer'>
                 
                        <form  className = 'bookingForm' onSubmit={this.handleSubmit}  >
                       
                        <p>{`Hello ${this.props.user.username.toUpperCase()} !`}</p>
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
                                { data.time.map((time, index) => <option key={time} value={time} className = {index}>{time}</option>)}
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
                            <button >Submit</button>
                            <button onClick = {this.editToggler}>Bookings</button>
                            <button className = "button" onClick = {this.props.logout}>Log out </button>
                            <button className = "deleteButton2">Delete acount</button>
                        </form>
                    </div>
                    
                    :

                    <div className = "bookingContainer">
                        <div className = "booking2">
                        <p className = "p3">{this.props.user.username.toUpperCase()}</p>
                        <p className = "p3">{"Your booking is:"}</p>
                        <p className = "p2"> {`For: ${this.state.booking2.name}`}</p>
                        <p className = "p2">{moment(this.state.booking2.date).format("MMM Do YY ")}</p>
                        <p className = "p2">{`Time: ${this.state.booking2.time}`}</p>
                        <p className = "p2">{`Phone: ${this.state.booking2.phone}`}</p>
                        <p className = "p2">{`Email: ${this.state.booking2.email}`}</p>
                        </div>
                        <button className = "button1" onClick = {this.editToggler}>Return</button>
                        <button className = "button1" onClick = {this.props.logout}>Log out </button>
                    </div>
                }
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