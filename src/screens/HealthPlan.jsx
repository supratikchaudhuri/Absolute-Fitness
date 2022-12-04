import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HealthPlan() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [trainer, setTrainer] = useState(null);
  const [userHealthRecord, setUserHealthRecord] = useState({});

  const getTrainer = async () => {
    try {
      const res = await axios.get(`user/${user.email}/trainer`);
      setTrainer(res.data);
    }
    catch(err) {
      console.log(err);
    }
  }

  const getHealthRecord = async () => {
    try {
      const res = await axios.get(`user/${user.email}/healthRecords`);
      setUserHealthRecord(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTrainer();
    getHealthRecord();
  }, [])

  return (
    <div className='health-plan-div'>
      <p>Plan description</p>

      <p>Current Height: {userHealthRecord.height}</p>
      <p>Current Height: {userHealthRecord.weight}</p>
      <p>Current Height: {userHealthRecord.bmi}</p>

      <p>Your trainer: {trainer}</p>


      <div>
        <MDBBtn onClick={e => navigate(`/user/${user.email}/workout-plan`)}> My Workout Plan </MDBBtn>
        <MDBBtn onClick={e => navigate(`/user/${user.email}/diet-plan`)}> My Diet Plan </MDBBtn>
      </div>

      <div>
        <p>Please contact your trainer if you wish to make changes to your health plan.</p>
      </div>
      
    </div>
  )
}

export default HealthPlan