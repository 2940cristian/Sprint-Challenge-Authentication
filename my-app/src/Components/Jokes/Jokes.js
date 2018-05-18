import React, {Component} from "react";
import axios from "axios"
import {withRouter} from "react-router-dom"
import "../Jokes/Jokes.css"
class Jokes extends Component {
    constructor() {
        super();
        this.state = {
            jokes: []
        }
    }

    componentDidMount = event => {
        const token = localStorage.getItem('token');
        const authtoken = `${token}`;

        const requestOptions = {
            headers: {
                Authorization: authtoken,
            }
        }

        axios.get("http://localhost:5000/api/jokes", requestOptions)
        .then(response => {
            console.log("jokes", response)
            this.setState({
                jokes: response.data
            });
        }).catch(err => {
            alert("Please login to view jokes")
            this.props.history.push('/login')
        })
    }

    deleteToken = () => {
        localStorage.removeItem("token")
        this.props.history.push('/login')
    }



    render() {
        return(
            <div>
                {this.state.jokes.length < 1 ? (
                    <h1>loading</h1>
                ) : (
                    <div>
                        <div className="header">
                            <h1> DAD JOKES!</h1>
                            <button onClick={this.deleteToken}>Sign out</button>
                        </div>

                        <ul>
                            {this.state.jokes.map(jokes => <div className="card" key={jokes.id}><h2>{jokes.setup}</h2><h3>{jokes.punchline}</h3></div>)}
                        </ul>
                    </div>
                    // <div>Hello</div>
                )}
            </div>
        )
    }
}

export default withRouter(Jokes);