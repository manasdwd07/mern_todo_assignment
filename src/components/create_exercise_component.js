import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Navbar from './navbar_component';

export class create_exercise_component extends Component {
    constructor(props) {
        super(props);

        this.state = {
                
            description: '',
            duration: '',
            date: new Date(),
            
            users:[]
        }
        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
    }

    // componentWillMount() {
    //     axios.get('http://localhost:5000/users/')
    //         .then(res => {
    //             if (res.data.length > 0) {
    //                 this.setState({
    //                     users: res.data.map(user => user.name),
    //                     username:res.data[0].name
    //             })
    //         }
    //     })
    // }

   

    onChangeDescription(e) {
        this.setState({
            description:e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let exercise = {
            
            description: this.state.description,
            duration: this.state.duration,
            date:this.state.date,
            status:'pending'
            
        }

       
        
        axios.post('http://localhost:5000/exercises/add',exercise, {headers:{
            Authorization:"Bearer "+localStorage.getItem('authToken')
        }})
            .then(res => console.log(res.data));
        this.props.history.push('/exercises');
        
        //  window.location='/exercises';   
        
    }
    render() {
        return (
            <div>
                <Navbar />
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label>Description: </label>
                        <input type='text'
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                    </div>
                
                </form>
            </div>
        )
    }
}

export default create_exercise_component
