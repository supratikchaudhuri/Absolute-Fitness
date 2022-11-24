import React, { useEffect, useState } from 'react';

import CardGridWorkout from '../components/CardGridWorkout';

function WorkoutPlan() {

  const [workoutPlan, setWorkoutPlan] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        // const res = await axios.get(`${user.phone}/workoutplan`);
        // setWorkoutPlan(res.data)
      } catch (err) {
        console.log(err);
      }

      getWorkouts()
    }
    
  }, [])

  return (
    <div className='workoutPlan plan'>
      <h3>Monday</h3>
      <h5>Focus: Ches & Triceps</h5>
      <CardGridWorkout></CardGridWorkout>

      <h3>Tuesday</h3>
      <h5>Focus: Ches & Triceps</h5>
      <CardGridWorkout></CardGridWorkout>

      <h3>Monday</h3>
      <h5>Focus: Ches & Triceps</h5>
      <CardGridWorkout></CardGridWorkout>

      <h3>Monday</h3>
      <h5>Focus: Ches & Triceps</h5>
      <CardGridWorkout></CardGridWorkout>
    </div>
  )
}

export default WorkoutPlan