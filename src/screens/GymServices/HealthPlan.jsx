import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HealthPlan() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("emial: " + user.email);

  const [userHealthRecord, setUserHealthRecord] = useState(null);
  const [healthPlan, setHealthPlan] = useState(null);

  const getHealthRecord = async () => {
    try {
      const res = await axios.get(`/healthRecord/${user.email}`);
      setUserHealthRecord(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getHealthPlan = async () => {
    try {
      const res = await axios.get(`/healthPlan/${user.email}`);
      setHealthPlan(res.data);
    } catch (err) {
      alert(err.response.data.msg || err);
    }
  };

  useEffect(() => {
    getHealthRecord();
    getHealthPlan();
  }, []);

  console.log(healthPlan);
  console.log(userHealthRecord);

  return healthPlan ? (
    <div className="health-plan-div mb-4">
      <h1>Change layout looks shit</h1>
      {userHealthRecord && userHealthRecord.length > 0 && (
        <>
          <p>
            Current height: {userHealthRecord.at(-1).height} cm, weight:{" "}
            {userHealthRecord.at(-1).weight} Kg, BMI:{" "}
            {userHealthRecord.at(-1).bmi}
          </p>
        </>
      )}
      <div className="health-plan-trainer">
        <p>
          Your trainer is{" "}
          {healthPlan.trainer_name ? healthPlan.trainer_name : "not assigned"}
        </p>

        <img src={healthPlan.trainer_url} />

        <p>About your health plan: {healthPlan.health_plan_description}</p>
      </div>
      <div className="d-flex flex-row">
        <div className="row w-100">
          <div className="mt-4 health-plan-workout col-xs-12 col-md-6">
            <p>Your Workout Plan: {healthPlan.workout_plan_name} </p>
            <p> {healthPlan.workout_description} </p>
            <button
              className="btn btn-primary"
              onClick={(e) => navigate(`/user/${user.email}/workout-plan`)}
            >
              {" "}
              View Workouts{" "}
            </button>
          </div>

          <div className="mt-4 health-plan-diet col-xs-12 col-md-6">
            <p>Your Diet Plan : {healthPlan.diet_name}</p>
            <p> {healthPlan.diet_description} </p>
            <button
              className="btn btn-primary"
              onClick={(e) => navigate(`/user/${user.email}/diet-plan`)}
            >
              {" "}
              View Diets{" "}
            </button>
          </div>
        </div>
      </div>
      <div
        className="mt-4 m-auto col width-100 alert alert-success"
        style={{ width: "fit-content" }}
      >
        Please contact your trainer if you wish to make changes to your health
        plan.
      </div>
    </div>
  ) : (
    <div className="mt-3 col width-100 alert alert-primary">
      No health plan. Please contact admin to assign a plan
    </div>
  );
}

export default HealthPlan;
