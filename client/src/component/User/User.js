import React from "react"
import {Redirect} from "react-router-dom"
import Axios from 'axios'
import './css.css'
import logo from '../assets/logo.png';
import { VscEdit, VscSave } from "react-icons/vsc";
// import axios from "axios";

let updateState

export default class User extends React.Component{

    constructor(props){
        super(props)
        let loggedIn = false
        
        const token = localStorage.getItem("token")
        if(token) loggedIn = true
        this.logout = this.logout.bind(this)
        this.changeIcon = this.changeIcon.bind(this)
        this.state= {
            username:"",
            email:"",
            password:"",
            loggedIn,
            changeIcon:false,
            note:""
        }
        this.noteAdded = this.noteAdded.bind(this)
        this.Added= this.Added.bind(this)
    }
 
    componentDidMount(props){
        console.log(this.props.location.state.id)
        Axios.get(`http://localhost:5000/${this.props.location.state.id}/getData`)
        .then(respone =>{
            console.log(respone);
            this.setState({
                username:respone.data.username,
                email:respone.data.email,
                password:respone.data.password
            })
            // this.setState({posts: respone.data})
        })
    //     // .catch(console.log("error"))
    
    }

    logout(){
        this.setState({
            loggedIn: false
        })
    }

    changeIcon(){
        this.setState({
            changeIcon: !this.state.changeIcon
        })
    }

    noteAdded(event){
        this.setState({
            [event.target.name]: event.target.value
        })
        // console.log(this.state.note);
    }

   async Added(ev){ 
        ev.preventDefault()
        const { note } = this.state
        try {
            const token = await Axios.post("/note", { note })
            console.log("done22");
        } catch (err) {
            this.setState({
                error: err.message
            })
        }
    }

    render(){
        if(this.state.loggedIn === false){
            return <Redirect to="/logout" />
        }

        // let icon , info ,notinfo;

        // if(this.state.changeIcon === true){
        //     icon =(
        //         <>
        //         <VscSave onClick={this.changeIcon} ></VscSave>
                
        //         </>
        //     );
        //     info=(
        //         <p>hi</p>
        //     )
        // }
        // else{
        //     icon =(
        //         <VscEdit onClick={this.changeIcon} ></VscEdit>
        //     )
        //     notinfo=(
                
               
        //     )
        // }

        return(
            
            <div className="cont">
                
                <div className="logo">
                    <img src={logo} width="60px" height="70px" alt="" />
                    
                    <h3>username</h3>
                    <div className="editlogo" >
                        {/* <VscEdit onClick={this.changeIcon} ></VscEdit> */}
                        {/* {icon} */}
                        </div>
                </div>
                
                    {/* {info} */}
                    {/* {notinfo} */}
                    <div className="info">
                <h3>Information  </h3>
                <div className="inputTag">
                    <div className="email" >
                        Username :
                        <input key={this.state.id} type="text" name="username" value={this.state.username} placeholder="Username"  />
                    </div>
                    <div className="email">
                        Email :
                        <input key={this.state.id} type="text" name="email" value={this.state.email} placeholder="Email" />
                    </div>
                    <div className="email">
                        Password :
                        <input key={this.state.id} type="text" name="password" value={this.state.password} placeholder="Password" />
                    </div>
                    <div>
                        <textarea key={this.state.id} type='text' name='note' rows="4" cols="50" value={this.state.note}  onChange={this.noteAdded} /> 
                        <div>
                            <button onClick={this.Added} >Add this note</button>
                        </div>
                    </div>

                </div>
                <div className="btnn">
                    <button className="btnsize" onClick={this.logout}  >Logout</button>
                </div>
            </div>
                
                
            </div>
        )
    }
}