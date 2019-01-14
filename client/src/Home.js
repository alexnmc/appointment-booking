import React, {Component} from 'react'
import axios from 'axios'
import data from './time.json'

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
        return(
            <div className = "home">
            
                <div className='bookingContainer'>
                    <form onSubmit={this.handleSubmit} className = 'bookingForm'>
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
                    </form>
                </div>
            </div>
        )
    }
}

export default Home