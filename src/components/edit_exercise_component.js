import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Navbar from './navbar_component';


export class edit_exercise_component extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            status:'pending',
            users:[]
        }
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
    }

    

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id,{})
            .then(res => {
                this.setState({
                    
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                });
                
            }).catch(function (err) {
                console.log(err)
            })
            
    }

 
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
        // e.preventDefault();

        let exercise = {
            
            description: this.state.description,
            duration: this.state.duration,
            date:this.state.date,
            status:this.state.status
        }

        
        axios.put('http://localhost:5000/exercises/update/'+this.props.match.params.id,
         exercise)
            .then(res => console.log(res.data))
            axios.get('http://localhost:5000/exercises')
            .then(res=>{console.log(`in update exercise after get ${res}`);
            this.props.history.push('/exercises')    
        })
            
            .catch(err=>console.log(err)
            )


                  
        this.props.history.push('/exercises');
        
    }
    render() {
        return (
            <div>
                <Navbar />
                <h3>Edit ToDo</h3>
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
                        <input type="submit" value="Edit ToDo" className="btn btn-primary" onClick={this.onSubmit}/>
                    </div>
                
                </form>
            </div>
        )
    }
}

export default edit_exercise_component;
