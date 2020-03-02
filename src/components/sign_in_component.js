import React, { Component } from 'react'
import axios from 'axios';
import sweetalert2 from 'sweetalert2';
import {Link} from 'react-router-dom';

export class sign_in_component extends Component {
    constructor(props){
        super(props);
        this.submitHandler=this.submitHandler.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.state={
            email:'',
            password:''
        }
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    submitHandler(e){
        e.preventDefault();

        const userInput={
            email:this.state.email,
            password:this.state.password
        }
        axios.post('http://localhost:5000/auth',userInput)
        .then(res=>{
            
            
        sweetalert2.fire({
            "title":'Login successful',
            'text':'Enjoy ToDo Tracker',
            "icon": 'success',
        }
        )

        
        
        
        console.log('res.data.tokenres.data.token', res.data.token);
        localStorage.setItem('authToken',res.data.token)
        this.props.history.push('/exercises');
    })
        .catch(err=>{
            sweetalert2.fire({
                "title":"Invalid credentials",
                "text":"Oops.... I could'nt find you",
                "icon":"warning"    
            })
        });


        
       
    }
    render() {
        return (
            <div className="container text-center">
                <h3>Hello user, Please sign in below :-</h3>
                <form>
                    <div className="form-group">
                        <label>Email:- </label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={this.onChangeEmail}/>
                    </div>

                    <div className="form-group">
                        <label>Password:- </label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.onChangePassword}></input>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-info" onClick={this.submitHandler}>Sign in</button>

                    </div>
                    <div className="form-group">
                        <Link to="/"><button className="btn btn-warning">Not a user? Create an account now</button></Link> 
                    </div>
                </form>
            </div>
        )
    }
}

export default sign_in_component
