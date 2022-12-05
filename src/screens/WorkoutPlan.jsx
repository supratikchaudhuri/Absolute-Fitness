import axios from 'axios';
import React, { useEffect, useState } from 'react';

import CardGridWorkout from '../components/CardGridWorkout';

function WorkoutPlan() {

  const [workoutPlan, setWorkoutPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const res = await axios.get(`/user/${user.email}/workoutPlan`);
        console.log(
          res.data
        );
        setWorkoutPlan(res.data)
      } catch (err) {
        console.log(err);
      }
    }

    getWorkouts();
    
  }, [])
  console.log(workoutPlan);

  return (
    workoutPlan && 
    <div className='workout-plan plan'>
      <h3>{ workoutPlan.description }</h3>
      <h5>{ new Date().toISOString().slice(0, 10) }</h5>
      
      <CardGridWorkout workouts={workoutPlan.excercises}></CardGridWorkout>
      
    </div>
    
  )
}

export default WorkoutPlan