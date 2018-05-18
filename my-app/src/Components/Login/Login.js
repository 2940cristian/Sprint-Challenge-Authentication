import React, {Component} from "react"
import axios from "axios"
import "../Login/Login.css"
import {withRouter} from "react-router-dom"

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            type: "password"
        }
    }

    showPassword() {
        if(this.state.type === "password") {
            this.setState({
                type: "text"
            })
        } else {
            this.setState({
                type: "password"
            })
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        if(this.state.username.length < 1 || this.state.password.length < 1) {
            alert("Please input a username and password");
            return;
        }
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post("http://localhost:5000/api/login", user)
        .then(response => {
            alert("Loggin in");
            localStorage.setItem("token", response.data.token)
            this.props.history.push('/jokes')
        }).catch(err => {
            console.log(err);
            alert("Failed to find a user with that username and password");
            this.props.history.push('/')

        })
    }



    render() {
        return(
            <div className="body">
                <div className="container">
                    <div className="register--header">
                        <h2>Login</h2>
                    </div>

                    <div className="form">
                        <form onSubmit={this.handleFormSubmit}>
                            <input onChange={this.handleInputChange}  type="text" name="username" placeholder="Username:"/>
                            <input onChange={this.handleInputChange}  type={this.state.type} name="password" placeholder="Password:"/>

                            <div className="register--checkbox">
                                <input onClick={() => {
                                    this.showPassword()
                                }} type="checkbox"/>
                                <p>Show password</p>
                            </div>
                            
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);