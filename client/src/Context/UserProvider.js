import React, {Component} from 'react'
import axios from 'axios'


const Context = React.createContext()


class UserProvider extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            paswword2: '',
            toggle: true,
            adminPassword: '',
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            
        }
    }

    
    resetToggle = () => {
        this.setState({
            toggle: true
        })
    }
    
    
    editToggler2 = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle  //toggle from login to signin
            }
        })
    }

    signup = userInfo => {
        this.state.password === this.state.password2 ?
        axios.post('/user/signup', userInfo).then(res => {
            const { token, user } = res.data
            localStorage.setItem("user", JSON.stringify(user))//stores the token and the user  in local storage in case of page refresh...
            localStorage.setItem("token", token)
            this.setState({ user: user, token })
        })
        .catch(err => alert(err.response.data.errMsg))
        :
        alert('passwords does not match')
    }

    login = userInfo => {
        axios.post('/user/login', userInfo).then(res => {
            const { token, user } = res.data // when the token and user comes back from the database we store it in local storage
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            this.setState({ user: user, token })
        })
        .catch(err => alert(err.response.data.errMsg))
        
    }
   
    handleLogin = (e) => {   // login method, we send the username and password entered in the input fields to the database 
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            password: this.state.password
        }

        this.login(newUser) // calling the login function

        this.setState({
            username: '',
            password: '',
            password2: ''
        })
        
    }

    handleSignup = (e) => {
        e.preventDefault()
            const newUser = {
                username: this.state.username,
                password: this.state.password
            }

            this.signup(newUser)
            this.setState({
                username: '',
                password: '',
                password2:''
            })
    }

    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleDelete2 = (id) => {
        axios.delete(`/user/${id}`).then(res => {
            alert(res.data)
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

    
    render() {

        return (

            <Context.Provider
                value={{
                   username:this.state.username,
                   password: this.state.password,
                   adminPassword: this.state.adminPassword,
                   user: this.state.user,
                   token: this.state.token,
                   toggle: this.state.toggle,
                   editToggler2 : this.editToggler2,
                   signup : this.signup,
                   login : this.login,
                   handleLogin: this.handleLogin,
                   handleSignup: this.handleSignup,
                   handleChange:this.handleChange,
                   handleDelete2: this.handleDelete2,
                   logout: this.logout,
                   resetToggle: this.resetToggle

                }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default UserProvider



export const withUser= C => props => (
    <Context.Consumer>
        {value => <C {...props} {...value}/> }
    </Context.Consumer>
)