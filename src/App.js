import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ExercisesList from './components/exercises_list_component';
import EditExercise from './components/edit_exercise_component';
import CreateExercise from './components/create_exercise_component';
import HomePage from './components/HomePage';
import SignIn from './components/sign_in_component';
import AuthRoute from './middlewares/AuthRoute';

function App() {
  return (
    <Router>
      <div className="container">
      
      <br />
      <Route exact path='/' exact component={HomePage}/>
      
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route exact path="/signin" component={SignIn} />
      <AuthRoute exact path="/exercises" component={ExercisesList} />
      
     
      
      </div>
    </Router>
  );
}

export default App;
