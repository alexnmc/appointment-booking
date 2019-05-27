import React , {Component, Fragment} from 'react'
import {withAdmin} from './Context/AdminProvider'
import axios from 'axios'
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
            notAvailable1:false,
            notAvailable2:false,
            notAvailable3:false,
            times:[
                "09:00 - 10:00", 
                "10:00 - 11:00",
                "11:00 - 12:00", 
                "12:00 - 01:00",
                "01:00 - 02:00",
                "02:00 - 03:00",
                "03:00 - 04:00",
                "04:00 - 05:00"
               ],
               time2:'',
               targetDate:''
            
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
                    jetski: jetski,
                    time2: time,
                    targetDate:date
                }
            })
                this.props.handleToggle(id)
                this.checkJetski(time, date)
                this.checkTime(date)
    }
    
    
    check3 = (arr)=>{    //checks if the time requested was in the database 3 times
        let arr2 = []
        let arr3 = []
        let arr4 = []
        for(let i = 0; i < arr.length; i++){
         if(!arr2.includes(arr[i].time)){
            arr2.push(arr[i].time)
            arr3.push([])
         }
        }
        for(let j = 0; j < arr2.length; j++){
            for(let x = 0; x < arr.length; x++){
                if(arr2[j] === arr[x].time){
                    arr3[j].push(arr2[j])
                }
            }
        }
        for(let i = 0; i<arr3.length; i++){
            if(arr3[i].length >= 3){
            arr4.push(arr3[i][0])
            }
        }
        return arr4
    }
    
    
    
    checkTime = (date) => {
        axios.get(`bookings/date/${date}`).then(res => {
            let arr2 = res.data
            let arr = this.check3(arr2)
            for(let i = 0; i < arr.length; i++){
                this.setState({
                   times: arr.length === 8 ? ["no available time"] : this.state.times.filter(item => arr[i] !== item),
                })
            }
        })
    }

    
    checkJetski = (time, date) => {
        this.setState({loading:"on"})
        axios.get(`bookings/jet/1?date=${date}&time=${time}`).then(res => {
            console.log('admin', res.data)
            let arr = res.data
            for(let i = 0; i < arr.length; i++){
                if(arr[i].jetski === 'Kawasaki'){this.setState({notAvailable2: true})}
                if(arr[i].jetski === 'Bombardier'){this.setState({notAvailable1: true})}
                if(arr[i].jetski === 'Honda'){this.setState({notAvailable3: true})}
            }
            this.setState({
                loading: "off"
            })
        })
    }

    
    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
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
                   ],
            notAvailable1:false,
            notAvailable2:false,
            notAvailable3:false,
            targetDate: e.target.value
        })
       
        this.checkTime(e.target.value)
        this.checkJetski(this.state.time2, e.target.value)
        
    }

    
    handleChange3 = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name]: value,
            time2: e.target.value
        })
        this.setState({
            notAvailable1:false,
            notAvailable2:false,
            notAvailable3:false,
            
        })
        this.checkJetski(e.target.value, this.state.targetDate)
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
            delete updates.date   // we dont want to send any empty items to the database because the booking object will get updated with the new empty values
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
        this.setState({
            notAvailable1:false,
            notAvailable2:false,
            notAvailable3:false,
            time2:'',
            targetDate:''
        })
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
                
                <form  className = 'bookingForm2'>
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
                     onChange={this.handleChange2}
                />
                <select 
                     className = "edit"
                     name='time'
                     value={this.state.time}
                     onChange={this.handleChange3}>
                     <option value = ''>Choose a Time</option>
                     {this.state.times.map((time, index) => <option key={time} value={time} className = {index}>{time}</option>)}
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
                    <option value = ''>Switch to:</option>
                   {this.state.notAvailable2 === false && <option value = 'Kawasaki'> Kawasaki</option>}    
                   {this.state.notAvailable1 === false && <option value = 'Bombardier'> Bombardier</option>}
                   {this.state.notAvailable3 === false && <option value = 'Honda'> Honda</option>}
                </select>
                <button className = "editButton" onClick = {this.handleSubmit}>Save</button>
                <button className = "editButton" onClick = {this.editToggle}>Exit</button>
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