import React , {Component, Fragment} from 'react'
import {withAdmin} from './AdminProvider'
import data from './time.json'
import moment from 'moment' // formats the date displayed..

//this is the admins page, we can get here only with a token

class AdminPortal extends Component  {
    
    constructor(){
        super()
        this.state = {
            
            date: '',
            time: '',      //we store all the data from the edit inputs here 
            name: '',
            email: '',
            phone: '',
            toggle: true,
            currentId: ''
        }
    }
    
    
    
    componentDidMount(){        //(when the page loads the function fires)
        
        this.props.showBookings() // method comes from context, it shows all the bookings from the database in an array
    }

    
    
    editToggler = (id, name, date, time, phone, email) => {// this method grabs the booking id from the displayed booking and stores it in state so the handleEdit method can grab it from state
        this.setState(prevState =>{
            return{
                toggle: !prevState.toggle,
                currentId: id,                    // it saves the id in state
                date: date,
                time: time,      
                name: name,
                email: email,
                phone: phone,
            }
        })
    }
    
    
    
    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    
    
    handleSubmit = (e, id) => {  // on submit we are sending a new booking object to the database
         e.preventDefault()
    
        const updates = {
                date: this.state.date,
                time: this.state.time,    // creates the object we want to send for editing, the database finds the object in the database and updates all the changed values
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
        }
        if(!updates.date.length) { // if state did not get any data from the inputs than we delete all those from our updates object so we dont loose the saved booking details
            delete updates.date   // we dont want to send any empty items to the database because the booking object  will get updated with the new empty values
        }
        if(!updates.time.length) {
            delete updates.time
        }
        if(!updates.name.length) {
            delete updates.name
        }
        if(!updates.email.length) {
            delete updates.email
        }
        if(!updates.phone.length) {
            delete updates.phone
        }
        console.log("this goes into the database for update=",updates)
        
        this.props.handleEdit(this.state.currentId, updates)// we grab from state the id of the booking we want to edit  and then we call the handleEdit function with it!
        this.editToggler(null)
    }
   
    
   
   
render(){
       
        let mapIt = this.props.bookings.map(item => {
                                
            return(
                
                <div className = "bookingList" key = {item._id} > 
                        
                        {`Name: ${item.name.toUpperCase()} ,
                        Date: ${moment(item.date).format("MMM Do YY ")} ,
                        Time: ${item.time} , Phone: ${item.phone} , 
                        Email: ${item.email}`}
                    
                    <button className = 'deleteButton' onClick = {() => this.props.handleDelete(item._id)}>Delete</button>  
                    <button className = 'deleteButton' onClick={() => this.editToggler(item._id, item.name, item.date, item.time, item.phone,item.email)}>Edit</button>
                
                </div>  
        )})
       
       
    
    return (
            <Fragment>
                <div className = "adminPortal2">
                    <h1 className= 'h1'>Bookings:</h1>
                       { this.state.toggle ?
                       
                                mapIt

                            :
            
                                <form onSubmit={this.handleSubmit} className = 'bookingForm2'>
                                   <p className = "p">Edit here:</p>
                                    <input 
                                        className = "edit"
                                        type='date' 
                                        name='date'
                                        value={this.state.date} 
                                        onChange={this.handleChange}
                                        />
                                    <select 
                                        className = "edit"
                                        name='time'
                                        value={this.state.time}
                                        onChange={this.handleChange}>
                                        <option value = ''>Choose a Time</option>
                                        {data.time.map((time, index) => <option key={time} value={time} className = {index}>{time}</option>)}
                                    </select>
                                    <input 
                                        className = "edit"
                                        type='text'
                                        name='name'
                                        placeholder='Name'
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        />
                                    <input 
                                        className = "edit"
                                        type='email'
                                        name='email'
                                        placeholder=' Email'
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        />
                                    <input 
                                        className = "edit"
                                        type='number'
                                        name='phone'
                                        placeholder='Phone'
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        />
                                    <button className = "editButton">Save</button>
                                </form>
                       }
                       
                        <button onClick = {this.props.logout}>Log out </button>
                </div>
                </Fragment>
        )
    }
}

    export default  withAdmin(AdminPortal)