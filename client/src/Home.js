import React, {Component} from 'react'
import axios from 'axios'
import data from './time.json'
import {withUser} from './UserProvider'
import {withAdmin} from './AdminProvider'
import moment from 'moment'




class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            
            date: '',
            time: '',      //we store all the data from the inputs here and after that we send it to the database
            name: '',
            email: '',
            phone: '',
            userID: this.props.user._id,
            username: this.props.user.username,
            toggle: true,
            booking2: [],
            availb: [] ,
            times:  [
                    "09:00 - 10:00", 
                    "10:00 - 11:00",
                    "11:00 - 12:00", 
                    "12:00 - 01:00",
                    "01:00 - 02:00",
                    "02:00 - 03:00",
                    "03:00 - 04:00",
                    "04:00 - 05:00"
                ]
        }
    }

    
    handleSubmit = (e) => {  // on submit we are sending a new booking object to the database
        e.preventDefault()
      
        const {date, time, name, email, phone, userID, username} = this.state
        
        axios.post(`/bookings/${this.state.date}`, {date, time, name, email, phone, userID, username}).then(res => {
            
                alert(res.data +' Date: '+ date +'  from '+ time)
        })
        this.setState({
            date: '',
            time: '',               // reseting all the inputs to be empty after submit
            name: '',   
            email: '',
            phone: ''
        })
    }


    
    checkTime = (date) => {
        axios.get(`bookings/date/${date}`).then(res => {
            let arr = res.data
            for(let i = 0; i < arr.length; i++){
                this.setState({
                   times: this.state.times.filter(item => arr[i].time !== item)
                })
                console.log(this.state.times)
            }
        })
    }


    handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
        this.setState({
            userID: this.props.user._id,
            username: this.props.user.username
        })
    }


    handleChange2 = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name]: value,
            times:[
                    "09:00 - 10:00", 
                    "10:00 - 11:00",
                    "11:00 - 12:00", 
                    "12:00 - 01:00",
                    "01:00 - 02:00",
                    "02:00 - 03:00",
                    "03:00 - 04:00",
                    "04:00 - 05:00"
                   ]
        })
        this.setState({
            userID: this.props.user._id,
            username: this.props.user.username
        })
        this.checkTime(e.target.value)
    }

    
    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle  
            }
        })
        this.showBooking(this.props.user._id)
    }


    showBooking = (id) => {
        axios.get(`/bookings/${id}`).then(res => { 
            this.setState({
                booking2: res.data
            })
        })
    }
    
    handleErase = () => {
            this.props.handleDelete2(this.props.user._id)
            this.props.logout()
            this.props.handleDelete3(this.props.user._id)
    }

    
    render(){

        let array = this.state.booking2
       
        array.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date) 
        })  

        let mapBooking2 = array.map(item =>{
            return(
              <div className = "homeBooking" key = {item._id}>
              <p className = "p2"> {`Name: ${item.name.toUpperCase()}`}</p>   
              <p className = "p2"> {`Date: ${moment(item.date).format("MMM Do YY ")}`}</p>
              <p className = "p2"> {`Time: ${item.time}`}</p>
              </div>
            )
        })
    
        return(
            <div className = "home">
                { this.props.token ?
                    <div>
                        {this.state.toggle ?
                            <div className='bookingContainer'>
                                <form className = 'bookingForm' onSubmit={this.handleSubmit}  >
                                    <p>{`Hello ${this.props.user.username.toUpperCase()} !`}</p>
                                    <p>Book your adventure:</p>
                                    <input className = "date"
                                        type='date' 
                                        name='date'
                                        value={this.state.date} 
                                        onChange={this.handleChange2}
                                        required
                                    />
                                    <select 
                                        required 
                                        aria-required="true" 
                                        name='time'
                                        value={this.state.time}
                                        onChange={this.handleChange}>
                                        <option value = ''>Available times:</option>
                                        {this.state.times.map((time, index) => <option key={time} value={time} className = {index}>{time}</option>)}
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
                                    <button className = "buttonS2">Submit</button>
                                </form>
                                    <button className = "buttonS" onClick = {this.editToggler}>Bookings</button>
                                    <button className = "buttonS" onClick = {this.props.logout}>Log out </button>
                                    <button className = "deleteButton2" onClick = {this.handleErase}>Delete Account</button>
                            </div>
                            
                            :

                            <div className = "bookingContainer2">
                                <p className = "p3">{`Bookings for ${this.props.user.username.toUpperCase()}:`}</p>
                                <div className = "booking2">
                                    {mapBooking2.length === 0 ? <p>no bookings</p>: mapBooking2}
                                </div>
                                <button className = "button4" onClick = {this.editToggler}>Return</button>
                            </div>
                        }
                    </div>
                    
                    :
                        
                    <div className = "homeContainer">
                            
                            <h2>Professional  jet ski  racing!</h2>
                            {this.props.toggle ?
                                <div className = 'logIn'>
                                    <form  onSubmit = {this.props.handleLogin}className='loginForm'>
                                        <h4>Bookings here:</h4>
                                        <input
                                            className = "login1"
                                            type ='text'
                                            name ='username'
                                            placeholder  ='Username:'
                                            value = {this.props.username}
                                            onChange= {this.props.handleChange}
                                        />

                                        <input
                                            className = "login1"
                                            type ='text'
                                            name ='password'
                                            placeholder ='Password:'
                                            value = {this.props.password}
                                            onChange = {this.props.handleChange}
                                        />

                                        <button className = 'loginButton'>Login</button>
                                    </form>
                                    <button className ='signupButton' onClick = {this.props.editToggler2}>Sign up</button>
                                </div>
                                
                                
                                :
                                
                                <form onSubmit={this.props.handleSignup} className='signUp'>
                                    <h4>Sign Up:</h4>
                                    
                                    <input
                                        className = "login1"
                                        type='text'
                                        name='username'
                                        placeholder ='enter a username:'
                                        value ={this.props.username}
                                        onChange ={this.props.handleChange}
                                    />

                                    <input
                                        className = "login1"
                                        type ='text'
                                        name ='password'
                                        placeholder ='choose your password:'
                                        value = {this.props.password}
                                        onChange = {this.props.handleChange}
                                    />

                                    <input
                                        className = "login1"
                                        type ='text'
                                        name ='password2'
                                        placeholder ='repeat password:'
                                        value = {this.props.password2}
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


export default withAdmin(withUser(Home))