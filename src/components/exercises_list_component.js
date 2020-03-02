import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar_component';
import ticklogo from '../assets/images/download-1013981__340.webp';
import '../assets/css/ticklogo.css';
import sweetalert2 from 'sweetalert2';








// Exercise -->Functional Component that returns a single row of pending todo

    export const Exercise=(props)=>{
    
    // Pre-checking the status of the particular todo
    if(props.exercise.status==='pending'){    
    return (
       
        <tr>
        
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link>|<a href="#" onClick={()=>{props.deleteExercise(props.exercise._id)}}>delete</a><a   href=""  onClick={()=>props.statusChange(props.exercise._id)}><img className="ticklogo" src={ticklogo} alt="TickLogo" width="10%" height="10%"/></a>
        </td>
    </tr>) }
    else{
        return null
    }     
}

// -------------------------------- Seperating Components





// CompletedExercise --> Functional component which returns a single row of completed todo data
export const CompletedExercise = props => {
    // Pre-checking the status of a particular todo
    if(props.exercise.status==='done'){
        return (
            <tr>
                <td>{props.exercise.description}</td>
                <td>{props.exercise.duration}</td>
                <td>{props.exercise.date.substring(0,10)}</td>
                <td><a href="#" onClick={()=>props.deleteExercise(props.exercise._id)}>Delete ToDo</a></td>
            </tr>
        )
    }
    else{
        return null

    }       
}



// ------------------------------------------------------------------Seperating Components





// exercises_list_component for displaying both the Pending todos and Completed todos

export class exercises_list_component extends Component {
    constructor(props) {
        super(props);
        
        // Binding this for all the methods created
        this.deleteExercise = this.deleteExercise.bind(this);
        this.deleteExerciseCompleted=this.deleteExerciseCompleted.bind(this);
        this.statusChange=this.statusChange.bind(this);
        this.exerciseListCompleted=this.exerciseListCompleted.bind(this);
        
        this.state = {
            exercises: [],
            response:{},
            tick:false
            
        };
    }

    componentDidMount() {
        this.todoList();
    }

    componentDidUpdate(){
        this.todoList();
    }   

    // Initialize method to display list of todos 
    todoList=()=>{
        
        // Getting all todos from api
        axios.get('http://localhost:5000/exercises/')
        .then(res => {
            
            
            this.setState({ exercises:res.data  })
        })
        .catch(err => console.log('Error:' + err));

    }
    

    // For changing status of "pending" items to "done"

    statusChange(id){
        axios.put(`http://localhost:5000/exercises/updateStatus/${id}`,{status:'done'})
        .then(res=>console.log('updated data: ' +res.data))
        .catch(e=>console.log(e)
        )
        
        this.props.history.push('/exercises')
    }

    // For deleting a specific pending todo
    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(res=>console.log(res.data))

        this.setState({
            exercises:this.state.exercises.filter(el=>el._id!==id)
        })
        
    }
  

    //For deleting a specific completed todo 
    deleteExerciseCompleted(id) {
        const abc=this.state.exercises.filter(el=>el.status==='done');
        if(abc.length>1){
        
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))
        
        this.setState({
            exercises: this.state.exercises.filter(el=>el._id !== id)
        })
        
        }
        else
        {
            sweetalert2.fire({
                title:'Delete action denied',
                text:'Cannot delete single completed todo',
                icon:'error'
            })

        
        }
    }




    // For displaying list of pending items exerciseList() is called
    exerciseList() {
        
        
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} statusChange={this.statusChange} status={currentexercise.status} checkTick={this.checkTick}/>
            
        
        })
    }


    // For returning list of completed items exerciseListCompleted() is called
    exerciseListCompleted(){
        return this.state.exercises.map(currentexercise => {
            return <CompletedExercise exercise={currentexercise} deleteExercise={this.deleteExerciseCompleted} status={currentexercise.status} key={currentexercise._id}/>
        })}

    render() {
        return (
            <div>
                <Navbar/>
        <h1 className="text-primary text-center name" style={{"font-family":"'tangerine',serif"}}> {localStorage.getItem('name')}</h1>
                <h3>Pending ToDo's </h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                            <th>Completed ?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                        
                    </tbody>
                </table>
                <br/>
                <pre>----------------------------------------</pre>
                <h3>Completed Todo's</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseListCompleted()}
                        
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default exercises_list_component;