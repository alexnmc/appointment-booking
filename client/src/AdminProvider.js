import React, { Component } from 'react'
import axios from 'axios'

const AdminContext = React.createContext()



class AdminProvider extends Component {
    constructor(){
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            bookings:[],
            toggle: true,

        }
    }


    
    handleToggle = (id) => {

        this.state.bookings.map(item => item._id === id ? item.toggle = false : item.toggle = true)
    }
    
    
    
    handleEdit = (id, updates) => {
        axios.put(`/bookings/${id}`, updates).then(response => {
            console.log(response.data)
            const updatedBooking = response.data
            this.setState(prevState => {
                return {
                    bookings: prevState.bookings.map(item => item._id === id ? updatedBooking : item )
                }
            })
        })
    }
   

    
    logout = () => {
        this.setState({
            user:'',   // we logout by removing the token from state and local storage
            token: ''
        })
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    
    
    showBookings = () => {
        axios.get('/bookings').then(res => {  // get request to the database to display all the bookings on the AdminPortal page
          
            this.setState({
                bookings: res.data
            })
        })
    }
    
    
    
    handleDelete = (id) => {
        axios.delete(`/bookings/${id}`).then(res => {
                
            this.setState(prevState=>({//we use prevState so the requested booking gets deleted without refreshing
                    bookings: prevState.bookings.filter(item => item._id !== id)
    // filters the bookings array in state, updates state with a new array with all the items in the array which does NOT have the item._id ....
            }))
        })
    }
    
    
    
    
    handleDelete3 = (userID) => {
        axios.delete(`bookings/delete/${userID}`).then(res => {
                
            this.setState(prevState => {
                return {
                    bookings: prevState.bookings.filter(item => item.userID !== userID )
                }
            })
        })
    }
    
    
    
    signup = userInfo => {
        axios.post('/auth/signup', userInfo).then(res => {
            const { token, admin } = res.data
            localStorage.setItem("user", JSON.stringify(admin))//stores the token and the user  in local storage in case of page refresh...
            localStorage.setItem("token", token)
            this.setState({ user: admin, token })
            
        })
        .catch(err => alert(err.response.data.errMsg))
    }

    
    
    login = userInfo => {
        axios.post('/auth/login', userInfo).then(res => {
            
            const { token, admin } = res.data // when the token and user comes back from the database we store it in local storage
            localStorage.setItem("user", JSON.stringify(admin))
            localStorage.setItem("token", token)
            this.setState({ user: admin, token })
        })
        .catch(err => alert(err.response.data.errMsg))
    }

    
    
    render() {
        return (
            <AdminContext.Provider
                value={{
                    ...this.state,
                    signup: this.signup,    // sending all this with context
                    login: this.login,
                    logout: this.logout,
                    showBookings: this.showBookings,
                    handleDelete: this.handleDelete,
                    handleDelete3: this.handleDelete3,
                    handleEdit: this.handleEdit,
                    handleToggle: this.handleToggle,
                }}>
                {this.props.children}
            </AdminContext.Provider>
        )
    }
}

export default AdminProvider


export const withAdmin = C => props => (
    <AdminContext.Consumer>
        {value => <C {...props} {...value}/> }
    </AdminContext.Consumer>
)