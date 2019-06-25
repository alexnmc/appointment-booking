import React, {Component} from 'react'
import axios from 'axios'
import {withUser} from './UserProvider'
import {withAdmin} from './AdminProvider'

const JetSkiContext = React.createContext()


class JetSkiProvider extends Component {
    constructor(props){
        super(props)
        this.state = {
            targetDate:'',
            time2:'',
            loading:'off',
            date: '',
            time: '',      
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
            userID: JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user"))._id ,
            username: JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).username,
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
            time2:'',
            targetDate:'',
            userID: JSON.parse(localStorage.getItem("user"))._id,
            username: JSON.parse(localStorage.getItem("user")).username,
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
        for(let j = 0; j < arr2.length; j++){
            if(arr2[j] === arr[i].time){
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
            [name]: value,
            userID: JSON.parse(localStorage.getItem("user"))._id,
            username: JSON.parse(localStorage.getItem("user")).username,
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
    
    
    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle  
            }
        })
        this.showBooking(this.state.userID)
    }

    
    showBooking = (id) => {
        axios.get(`/bookings/${id}`).then(res => { 
            this.setState({
                booking2: res.data
            })
        })
    }
    
    
    handleErase = () => {
        this.props.handleDelete2()
        this.props.logout()
        this.props.handleDelete3(this.state.userID)  
    }

    
    
    render() {
        return (
            <JetSkiContext.Provider
                value={{
                    ...this.state,
                    handleSubmit: this.handleSubmit,
                    chek3: this.check3,
                    checkTime: this.checkTime,
                    checkJetski: this.checkJetski,
                    changeBackground: this.changeBackground,
                    saveJetski: this.saveJetski,
                    handleChange: this.handleChange,
                    handleChange2: this.handleChange2,
                    handleChange3: this.handleChange3,
                    showBooking: this.showBooking,
                    handleErase: this.handleErase
                }}>
                {this.props.children}
            </JetSkiContext.Provider>
        )
    }
}

export default withUser(withAdmin(JetSkiProvider))


export const withJetSki = C => props => (
    <JetSkiContext.Consumer>
        {value => <C {...props} {...value}/> }
    </JetSkiContext.Consumer>
)