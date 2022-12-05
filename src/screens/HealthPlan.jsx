import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HealthPlan() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("emial: " + user.email);
  const [trainer, setTrainer] = useState(null);
  const [userHealthRecord, setUserHealthRecord] = useState(null);
  const [healthPlan, setHealthPlan] = useState(null);


  const getHealthRecord = async () => {
    try {
      const res = await axios.get(`/user/${user.email}/healthRecords`);
      setUserHealthRecord(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const getHealthPlan = async () => {
    try {
      const res = await axios.get(`/user/${user.email}/healthPlan`);
      setHealthPlan(res.data);
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getHealthRecord();
    getHealthPlan();
  }, [])

  console.log(healthPlan);
  console.log(userHealthRecord);

  return (
    healthPlan 
    
    ? 

    <div className='health-plan-div'>

      {
        userHealthRecord && (
        <>
          <p>
            Current height: {userHealthRecord[0].height} cm, weight: {userHealthRecord[0].weight} Kg, BMI: {userHealthRecord[0].bmi}
          </p> 
        </>)
      }

      
      <div className='health-plan-trainer'>
        <p>Your trainer is {healthPlan.trainer_name}</p>

        <img src = {healthPlan.trainer_url}></img>
        

      </div>

      <div className='health-plan-2'>
        <div className='health-plan-workout'>
          <p>Your Workout Plan: {healthPlan.workout_plan_name} </p>
          <p> {healthPlan.workout_description} </p>
          <MDBBtn onClick={e => navigate(`/user/${user.email}/workout-plan`)}> View Workouts </MDBBtn>
        </div>

        <div className='health-plan-diet'>
          <p>Your Diet Plan : {healthPlan.diet_plan_name }</p>
          <p> {healthPlan.diet_description} </p>
          <MDBBtn onClick={e => navigate(`/user/${user.email}/diet-plan`)}> View Diets </MDBBtn>
        </div>
      </div>

      <div>
        <p>Please contact your trainer if you wish to make changes to your health plan.</p>
      </div>
      
    </div>

    :

    <div>No health plan. Please contact admin to assign a plan</div>
    
  )
}

export default HealthPlan