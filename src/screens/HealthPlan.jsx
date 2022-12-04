import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HealthPlan() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [trainer, setTrainer] = useState(null);
  const [userHealthRecord, setUserHealthRecord] = useState(null);
  const [healthPlan, setHealthPlan] = useState();
  const [loading, setLoading] = useState(true);

  // const getTrainer = async () => {
  //   try {
  //     const res = await axios.get(`/user/${user.email}/trainer`);
  //     setTrainer(res.data);
  //   }
  //   catch(err) {
  //     console.log(err);
  //   }
  // }

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
    // getTrainer();
    setLoading(true);
    getHealthRecord();
    getHealthPlan();
    setLoading(false);
  }, [])

  console.log(healthPlan);
  console.log(userHealthRecord);

  return (
    !loading 
    && 
    <div className='health-plan-div'>

      {
        userHealthRecord && (
        <>
          <p>Current Height: {userHealthRecord[0].height}</p>
          <p>Current Weight: {userHealthRecord[0].weight}</p>
          <p>Current BMI: {userHealthRecord[0].bmi}</p> 
        </>)
      }

      {
        healthPlan && 
        <>
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
        </>
      }

      <div>
        <p>Please contact your trainer if you wish to make changes to your health plan.</p>
      </div>
      
    </div>
    
  )
}

export default HealthPlan