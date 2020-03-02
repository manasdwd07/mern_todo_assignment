import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class HomePage extends Component{
    constructor(props){
        super(props);
        this.submitHandler=this.submitHandler.bind(this);
        this.state={
            name:'',
            email:'',
            password:'',
            confirmpassword:''
        }
        
    }
    
    submitHandler(e){
        e.preventDefault();
        const user={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            confirmpassword:this.state.confirmpassword
        }
        if(user.name!=='' && user.email!=='' && user.password===user.confirmpassword && user.password !=='' && user.confirmpassword !==''){
        axios.post('http://localhost:5000/users/add',user)
            .then(res=>console.log(res.data),alert(`Hooray! ${user.name} your details have been added`))
            .catch(err=>console.log('err'));
            this.props.history.push('/signin');
        } else{
            alert('Please fill in the fields properly')
        }
    }

   

    render(){
        return(
            <div className="container text-center">
                <h1>Welcome to the home page</h1>
                <h3>Please enter your details below to sign in :)</h3>

                <form>
                    <div className="form-group">
                        <label>Enter Name</label>
                        <input type="text" className="form-control" placeholder="Enter Name" onChange={(e)=>this.setState({name:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Enter email</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>this.setState({email:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Enter Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>this.setState({password:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e)=>this.setState({confirmpassword:e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-warning form-control" onClick={this.submitHandler}>Submit Details and Sign up</button>
                        <br/><br/>
                        <Link to ="/signin"><button className="btn btn-info form-control">ToDoTracker User Already ? Sign in Now !</button></Link>
                    
                    </div>
                </form>
            </div>
        )
    }
} 

export default HomePage;