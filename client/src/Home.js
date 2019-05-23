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
            jetski:'',
            jetskiStyle1: {opacity: 0},
            jetskiStyle2: {opacity: 0},
            jetskiStyle3: {opacity: 0},
            lightOn1: {color: ''},
            lightOn2: {color: ''},
            lightOn3: {color: ''},
            notAvailable1:false,
            notAvailable2:false,
            notAvailable3:false,
            userID: this.props.user._id,
            username: this.props.user.username,
            toggle: true,
            targetDate:'',
            booking2:[],
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
        }
    }

    
    handleSubmit = (e) => {  // on submit we are sending a new booking object to the database
        e.preventDefault()
        
        const {date, time, name, email, phone, jetski, userID, username} = this.state
        axios.post(`/bookings/${this.state.date}`, {date, time, name, email, phone, jetski, userID, username}).then(res => {
            
                alert(res.data +' Date: '+ date +'  from '+ time)
        })
        
         this.state.jetski.length ?
         this.setState({
            date: '',
            time: '',               // reseting all the inputs to be empty after submit
            name: '',   
            email: '',
            phone: '',
            jetski: '',
            userID:'',
            jetskiStyle1: {opacity: 0},
            jetskiStyle2: {opacity: 0},
            jetskiStyle3: {opacity: 0},
            lightOn1: {color: ''},
            lightOn2: {color: ''},
            lightOn3: {color: ''},
            notAvailable1:false,
            notAvailable2:false,
            notAvailable3:false,
        })
        :
        alert("Don't forget to choose a jet ski!")
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
            if(arr3[i].length === 3){
            arr4.push(arr3[i][0])
            }
        }
        return arr4
    }
    
    
    checkTime = (date) => {
        this.setState({targetDate: date})
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

    checkJetski = (time) => {
        axios.get(`bookings/jet/1?date=${this.state.targetDate}&time=${time}`).then(res => {
            let arr = res.data
            for(let i = 0; i < arr.length; i++){
                if(arr[i].jetski === 'Kawasaki'){this.setState({notAvailable2: true})}
                if(arr[i].jetski === 'Bombardier'){this.setState({notAvailable1: true})}
                if(arr[i].jetski === 'Honda'){this.setState({notAvailable3: true})}
            }
        })
    }

    changeBackground = (jet) => {
            jet === 'Bombardier' ? 
            this.setState({jetskiStyle1:{opacity:1},lightOn1: {color: 'rgb(243, 204, 168)'}, jetskiStyle2:{opacity:0}, lightOn2: {color: ''}, jetskiStyle3:{opacity:0}, lightOn3: {color: ''} })
          :
            jet === 'Kawasaki' ? 
            this.setState({jetskiStyle1:{opacity:0},lightOn1: {color: ''}, jetskiStyle2:{opacity:1},  lightOn2: {color: 'rgb(243, 204, 168)'}, jetskiStyle3:{opacity:0},lightOn3: {color: ''}})
            :
            jet === 'Honda' && this.setState({jetskiStyle1:{opacity:0},lightOn1: {color: ''}, jetskiStyle2:{opacity:0},  lightOn2: {color: ''}, jetskiStyle3:{opacity:1},lightOn3: {color: 'rgb(243, 204, 168)'}})
    }
    
    
    saveJetski = (jet) => {
        this.setState({
            jetski: jet,
           
        })
        this.changeBackground(jet)
    }

    
    handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
        this.setState({
            userID: this.props.user._id,
            username: this.props.user.username,
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
            time:''
        })
        this.setState({
            userID: this.props.user._id,
            username: this.props.user.username,
        })
        this.checkTime(e.target.value)
    }

    handleChange3 = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
        this.setState({
            userID: this.props.user._id,
            username: this.props.user.username,
            notAvailable1:false,
            notAvailable2:false,
            notAvailable3:false
        })
        this.checkJetski(e.target.value)
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
            array.sort(function (a, b){
                return new Date(a.date) - new Date(b.date) 
            })  

        let mapBooking2 = array.map(item =>{
            return(
              <div className = "homeBooking" key = {item._id}>
                <p className = "p2"> {`Name: ${item.name.toUpperCase()}`}</p>   
                <p className = "p2"> {`Date: ${moment(item.date).format("MMM Do YY ")}`}</p>
                <p className = "p2"> {`Time: ${item.time}`}</p>
                <p className = "p2"> {`JetSki: ${item.jetski}`}</p>
              </div>
            )
        })

        
        return(
            <div className = "home">
                {this.props.token ?
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
                                        onChange={this.handleChange3}>
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
                                    
                                    <p className = "chooseJet"> Choose your jet ski:</p>
                                    <div className = "jetskiWrap">
                                    {this.state.notAvailable1 ?
                                        <div></div>
                                        :
                                        <div className = "jetski1" onClick = {() => this.saveJetski('Bombardier')}><p className = "p1" style = {this.state.lightOn1}>Bombardier</p><div className = 'selected' style={this.state.jetskiStyle1}></div></div>
                                    } 
                                    {this.state.notAvailable2 ?
                                        <div></div>
                                        :
                                        <div className = "jetski2" onClick = {() => this.saveJetski('Kawasaki')}><p className = "p1" style = {this.state.lightOn2}>Kawasaki</p><div className = 'selected' style={this.state.jetskiStyle2}></div></div>
                                    }  
                                    {this.state.notAvailable3 ?
                                        <div></div>
                                        :
                                        <div className = "jetski3" onClick = {() => this.saveJetski('Honda')}><p className = "p1" style = {this.state.lightOn3}>Honda</p><div className = 'selected' style={this.state.jetskiStyle3}></div></div>
                                    }
                                    </div>
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
                                    {this.state.booking2.length === 0 ? <p>no bookings</p>: mapBooking2}
                                </div>
                                <button className = "button4" onClick = {this.editToggler}>Return</button>
                            </div>
                        }
                    </div>
                    
                    :
                        
                    <div className = "homeContainer">
                        
                            {this.props.toggle ?
                                <div className = 'logIn'>
                                    <h2 className = 'rent'>Jet Ski Rental</h2>
                                    <h2>Kawasaki - Honda - Bombardier</h2>
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