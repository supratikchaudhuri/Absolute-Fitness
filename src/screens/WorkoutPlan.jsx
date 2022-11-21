import React from 'react';

import CardGridWorkout from '../components/CardGridWorkout';

function WorkoutPlan() {
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