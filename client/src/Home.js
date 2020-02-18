import React, {Component} from 'react'
import moment from 'moment'
import Login from './Login'
import {withUser} from './Context/UserProvider'
import{withJetSki} from './Context/JetSkiProvider'
import Loading from './Loading'



class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: true,
            
        }
    }

   
    componentDidMount(){
        this.props.resetToggle()// reset from signup to login
    }
    
    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle  
            }
        })
        this.props.showBooking(this.props.user._id)
    }

    
    render(){

        let array = this.props.booking2
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
                                <form className = 'bookingForm' onSubmit={this.props.handleSubmit}  >
                                    <p>{`Hello ${this.props.user.username.toUpperCase()} !`}</p>
                                    <p>Book your adventure:</p>
                                    <input className = "date"
                                        type='date' 
                                        name='date'
                                        value={this.props.date} 
                                        onChange={this.props.handleChange2}
                                        required
                                    />
                                    <select 
                                        required 
                                        aria-required="true" 
                                        name='time'
                                        value={this.props.time}
                                        onChange={this.props.handleChange3}>
                                        <option value = ''>Available times:</option>
                                        {this.props.times.map((time, index) => <option key={time} value={time} className = {index}>{time}</option>)}
                                    </select>
                                    <input 
                                        type='text'
                                        name='name'
                                        placeholder='Name of Renter'
                                        value={this.props.name}
                                        maxLength = '10'
                                        onChange={this.props.handleChange}
                                        required
                                    />
                                    <input 
                                        type='email'
                                        name='email'
                                        placeholder='Your Email Address'
                                        value={this.props.email}
                                        onChange={this.props.handleChange}
                                        required
                                    />
                                    <input 
                                        type='number'
                                        name='phone'
                                        placeholder='Phone Number'
                                        value={this.props.phone}
                                        onChange={this.props.handleChange}
                                        required
                                    />
                                    <p className = "chooseJet"> Choose your jet ski:</p>
                                    <div className = "jetskiWrap">
                                    {this.props.loading === 'on' ?
                                        <Loading/>
                                        :
                                        <div className = "jetskiWrap">
                                            {!this.props.notAvailable1 && <div className = 'jetskiWrap2'>
                                                                            <div className = "jetski1" onClick = {() => this.props.saveJetski('Bombardier')}>
                                                                                <p className = "p1" style = {this.props.lightOn1}>Bombardier</p>
                                                                                <div className = 'selected' style={this.props.jetskiStyle1}></div>
                                                                            </div>
                                                                          </div>
                                            } 
                                            {!this.props.notAvailable2 && <div className = 'jetskiWrap2'>
                                                                                <div className = "jetski2" onClick = {() => this.props.saveJetski('Kawasaki')}>
                                                                                    <p className = "p1" style = {this.props.lightOn2}>Kawasaki</p>
                                                                                    <div className = 'selected' style={this.props.jetskiStyle2}></div>
                                                                                </div>
                                                                          </div>
                                            }  
                                            {!this.props.notAvailable3 && <div className = 'jetskiWrap2'>
                                                                            <div className = "jetski3" onClick = {() => this.props.saveJetski('Honda')}>
                                                                                <p className = "p1" style = {this.props.lightOn3}>Honda</p>
                                                                                <div className = 'selected' style={this.props.jetskiStyle3}></div>
                                                                            </div>
                                                                          </div>
                                            }
                                        </div>
                                    }
                                    </div>
                                    <button className = "buttonS2">Submit</button>
                                </form>
                                    <button className = "buttonS" onClick = {this.editToggler}>Bookings</button>
                                    <button className = "buttonS" onClick = {this.props.logout}>Log out </button>
                                    <button className = "deleteButton2" onClick = {this.props.handleErase}>Delete Account</button>
                            </div>
                            
                            :
                            <div className = "bookingContainer2">
                                <p className = "p3">{`Bookings for ${this.props.user.username.toUpperCase()}:`}</p>
                                <div className = "booking2">
                                    {this.props.booking2.length === 0 ? <p>no bookings</p>: mapBooking2}
                                </div>
                                <button className = "button4" onClick = {this.editToggler}>Return</button>
                            </div>
                        }
                    </div>
                    :
                    <Login/>
                }
            </div>
        )
    }
}


export default withUser(withJetSki(Home))