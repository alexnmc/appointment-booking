import React, {Component} from 'react'
import axios from 'axios'


const Context = React.createContext()


class UserProvider extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            toggle: true,
            adminPassword: '',
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
        }
        
    }

    
    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle  //toggle from login to signin
            }
        })
    }


   
    signup = userInfo => {
        axios.post('/user/signup', userInfo).then(res => {
            const { token, user } = res.data
            localStorage.setItem("user", JSON.stringify(user))//stores the token and the user  in local storage in case of page refresh...
            localStorage.setItem("token", token)
            this.setState({ user: user, token })
            
        })
        .catch(err => alert(err.response.data.errMsg))
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
            password: ''
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
            })

        
        this.editToggler()
    }



    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
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
                    ...this.state,
                   user: this.state.user,
                   editToggler : this.editToggler,
                   signup : this.signup,
                   login : this.login,
                   handleLogin: this.handleLogin,
                   handleSignup: this.handleSignup,
                   handleChange:this.handleChange,
                   logout: this.logout

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