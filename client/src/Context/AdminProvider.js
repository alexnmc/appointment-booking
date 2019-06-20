import React, { Component } from 'react'
import axios from 'axios'

const AdminContext = React.createContext()



class AdminProvider extends Component {
    constructor(){
        super()
        this.state = {
            admin: JSON.parse(localStorage.getItem("admin")) || {},
            token2: localStorage.getItem("token2") || "",
            bookings:[],
            toggle: true,
            username: '',
            password: '',
            password2: '',
            toggle2: true,
            adminCode: ''

        }
    }

    handleToggle = (id) => {
        this.state.bookings.map(item => item._id === id ? item.toggle = false : item.toggle = true)  
    }
    
    
    handleEdit = (id, updates) => {
        axios.put(`/bookings/${id}`, updates).then(response => {
            response.data === 'JetSki Not Available' && alert(response.data)
            const updatedBooking = response.data
            this.setState(prevState => {
                return {
                    bookings: response.data === 'JetSki Not Available' ? prevState.bookings : prevState.bookings.map(item => item._id === id ? updatedBooking : item )
                }
            })
        })
    }
   
    logout2 = () => {
        this.setState({
            admin:'',   // we logout by removing the token from state and local storage
            token2: ''
        })
        localStorage.removeItem("admin")
        localStorage.removeItem("token2")
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
    
    handleDelete3 = (userID) => { // deletes the bookings on delete account
        axios.delete(`bookings/delete/${userID}`).then(res => {
            this.setState(prevState => {
                return {
                    bookings: prevState.bookings.filter(item => item.userID !== userID )
                }
            })
        })
    }
    
    signup2 = userInfo => {
        axios.post('/auth/signup', userInfo).then(res => {
            const { token, admin } = res.data
            localStorage.setItem("admin", JSON.stringify(admin))    //stores the token and the user  in local storage in case of page refresh...
            localStorage.setItem("token2", token)
            this.setState({ admin: admin, token })
            window.location.reload()
            
        })
        .catch(err => alert(err.response.data.errMsg))
    }

    login2 = userInfo => {
        axios.post('/auth/login', userInfo).then(res => {
            const { token, admin } = res.data          // when the token and user comes back from the database we store it in local storage
            localStorage.setItem("admin", JSON.stringify(admin))
            localStorage.setItem("token2", token)
            this.setState({ admin: admin, token })
        })
        .catch(err => alert(err.response.data.errMsg))
    }

    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle2: !prevState.toggle2, //toggle from login to signin
                username: '',
                password: '',
                password2: '',
                adminCode: ''
            }
        })
    }

    handleLogin2 = (e) => {   // login method, we send the username and password entered in the input fields to the database 
        e.preventDefault()
        const newAdmin = {
            username: this.state.username,
            password: this.state.password
        }
        this.login2(newAdmin) // we are receiving this function from the context and we call it here 
        this.setState({
            username: '',
            password: ''
        })
    }

    adminSignup = () => {
        const newAdmin = {
            username: this.state.username,
            password: this.state.password
        }
        this.signup2(newAdmin)
        this.setState({
            username: '',
            password: '',
            password2:'',
            adminCode:''
        })
    }
    
    handleSignup2 = (e) => {
        e.preventDefault()
        this.state.password === this.state.password2 ?    
            this.state.adminCode === process.env.REACT_APP_CODE ?
                this.adminSignup()
                :
                this.state.adminPassword === "" ? 
                    alert("please enter secret code: vschool")
                    :
                    alert("wrong code")
        :
        alert('passwords does not match')
    }

    
    handleChange2 = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }



    
    render() {
        return (
            <AdminContext.Provider
                value={{
                    ...this.state,
                    handleToggle: this.handleToggle,
                    handleEdit:this.handleEdit,
                    logout2: this.logout2,
                    showBookings: this.showBookings,
                    handleDelete: this.handleDelete,
                    handleDelete3: this.handleDelete3,
                    signup2: this.signup2,
                    login2: this.login2,
                    editToggler: this.editToggler,
                    handleLogin2: this.handleLogin2,
                    adminSignup: this.adminSignup,
                    handleSignup2: this.handleSignup2,
                    handleChange2: this.handleChange2
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