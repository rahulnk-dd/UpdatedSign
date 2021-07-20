import React from "react"
import { Redirect, Link } from "react-router-dom"
import Axios from "axios"
import './login.css';
import { VscMail } from "react-icons/vsc";
import User from "../User/User";

export default class Login extends React.Component {

    constructor() {
        super()
        let loggedIn = false

        const token = localStorage.getItem("token")
        if (token) loggedIn = true

        this.state = {
            email: "",
            password: "",
            loggedIn,
            error: "Login Please"
        }
        this.onChange = this.onChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }

    onChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    async formSubmit(ev) {
        ev.preventDefault()
        const { email, password } = this.state
        try {
            const token = await Axios.post("/app/login", { email, password })
            localStorage.setItem("token", token)
            this.setState({
                loggedIn: true
            })
        } catch (err) {
            this.setState({
                // error: err.message
                error: "Wrong Email ID or Password"
            })
        }
    }

    render() {
        if (this.state.loggedIn === true) {
            const email = this.state.email;
            console.log(email)
            return (
                
            <Redirect   to={{
                pathname: "/user",
                state: { id: this.state.email}
              }}
            /> 
            
            )
        }
        return (
            <div className="bodylogin">
                <div className="box">
            <div className="continorlogin" >
                <div class="headlogin">Login</div> 
                    <div>
                        <div className="insidebox" >
                            <form onSubmit={this.formSubmit}>
                                <div className="inputbox">
                                    <div className="inputname">Email:</div>
                                    <input type="text" placeholder="Email" value={this.state.email} onChange={this.onChange} name="email" />
                                </div>
                                <div className="inputbox">
                                    <div className="inputname">Password:</div>
                                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} name="password" />
                                </div>
                                <div className="buttonlogin">
                                    <div>
                                        <button class="btnlogin" type="submit"> Login </button>
                                        <Link to='/reg' >
                                            <button class="btnlogin" > Register </button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                            <div className="errormsg">
                            {this.state.error}
                            </div>
                        </div>
                    </div>
               </div>
               </div>
               </div>

        )
    }
}