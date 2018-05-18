import React, {Component} from "react";
import axios from "axios"
import {withRouter} from "react-router-dom"
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
            this.props.history.push('/login')
        })
    }



    render() {
        return(
            <div>
                {this.state.jokes.length < 1 ? (
                    <h1>access denied</h1>
                ) : (
                    <ul>
                        {this.state.jokes.map(jokes => <div key={jokes.id}><h2>{jokes.setup}</h2><h3>{jokes.punchline}</h3></div>)}
                    </ul>
                    // <div>Hello</div>
                )}
            </div>
        )
    }
}

export default withRouter(Jokes);