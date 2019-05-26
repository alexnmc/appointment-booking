import React , {Component, Fragment} from 'react'
import {withAdmin} from './Context/AdminProvider'
import data from './time.json'
import moment from 'moment' // formats the date displayed..

//this is the admins page, we can get here only with a token

class AdminPortal extends Component  {
    
    constructor(props){
        super(props)
        this.state = {
            
            date: '',
            time: '',      //we store all the data from the edit inputs here 
            name: '',
            email: '',
            phone: '',
            jetski:'',
            toggle: true,
            currentId: '', // the id of the booking we want to edit...
            
        }
    }
    
    
    componentDidMount(){        
        this.props.showBookings() // method comes from context, it shows all the bookings from the database in an array
    }

    
    editToggle = (id, name, date, time, phone, email, jetski) => {// this method grabs the booking id from the displayed booking and stores it in state so the handleEdit method can grab it from state
        
            this.setState(prevState =>{
                return{
                    currentId: id,            // it saves the id in state
                    date: date,
                    time: time,      
                    name: name,
                    email: email,
                    phone: phone,
                    jetski: jetski
                }
            })
                this.props.handleToggle(id)
    }
    
    
    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
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
                jetski: this.state.jetski
        }
       
        if(!updates.date.length) { // if state did not get any data from the inputs than we delete all those from our update object so we dont loose the saved booking details
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
        if(!updates.jetski.length) {
            delete updates.jetski
        }
        this.props.handleEdit(this.state.currentId, updates)// we grab from state the id of the booking we want to edit  and then we call the handleEdit function with it!
    }

    

render(){
       
    let arr = this.props.bookings
    
        arr.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date)
        })  

        arr.sort(function(a, b){
            var nameA = a.name.toUpperCase() 
            var nameB = b.name.toUpperCase() 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        })

        arr.sort(function(a, b){
            var nameA = a.username.toUpperCase() 
            var nameB = b.username.toUpperCase() 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        })

        let mapIt = arr.map(item => {
                
            return(
                <div key = {item._id} >
                {item.toggle ?
                <div className = "bookingList" > 
                    <div className = "booking">
                    { ` User: ${item.username},
                        Name: ${item.name.toUpperCase()} ,
                        Date: ${moment(item.date).format("MMM Do YY ")} ,
                        Time: ${item.time} ,
                        Email: ${item.email} ,
                        Phone: ${item.phone} ,
                        Jetski: ${item.jetski}
                    `}
                    </div>
                    <button className = 'deleteButton' onClick = {() => this.props.handleDelete(item._id)}>Delete</button>  
                    <button className = 'deleteButton' onClick={() => this.editToggle(item._id, item.name, item.date, item.time, item.phone, item.email, item.jetski)}>Edit</button>
                </div>  

                :
                
                <form onSubmit={this.handleSubmit}  className = 'bookingForm2'>
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
                     type='email'
                     name='email'
                     placeholder='Email'
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
               
                <select 
                    className = 'edit'
                    name='jetski'
                    value={this.state.jetski}
                    onChange={this.handleChange}>
                    <option value = 'Kawasaki'>Kawasaki</option>    
                    <option value = 'Bombardier'>Bombardier</option>
                    <option value = 'Honda'>Honda</option>
                </select>
                <button className = "editButton">Save</button>
                 </form>
            }
            </div>
            )
        })
       
       
    return (
            <Fragment >
                <div className = "adminPortal2"  >
                    <div className ="adminPortal3">
                    <h1 className= 'h1'>{this.props.bookings.length === 1 ? '1 booking' : this.props.bookings.length + ' bookings'}</h1>
                    <button className = 'adminButton' onClick = {this.props.logout2}>Log out </button>
                        {mapIt}
                    </div>
                </div>
            </Fragment>
        )
    }
}

    export default  withAdmin(AdminPortal)