import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../components/AlertBox";
import { getHealthPlanForUser } from "../../api/healthPlan";
import { getHealthRecordForUser } from "../../api/healthRecord";

function HealthPlan() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [userHealthRecord, setUserHealthRecord] = useState(null);
  const [healthPlan, setHealthPlan] = useState(null);

  const getHealthRecord = async () => {
    const data = await getHealthRecordForUser(user.username);
    setUserHealthRecord(data);
  };

  const getHealthPlan = async () => {
    const data = await getHealthPlanForUser(user.username);
    setHealthPlan(data);
  };

  useEffect(() => {
    getHealthRecord();
    getHealthPlan();
  }, []);

  console.log(healthPlan);
  console.log(userHealthRecord);

  return healthPlan ? (
    <div className="health-plan-div">
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
              onClick={(e) => navigate(`/workout-plan`)}
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
              onClick={(e) => navigate(`/diet-plan`)}
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
    <AlertBox
      message={"No health plan. Please contact admin to assign a plan"}
      type="primary"
    />
  );
}

export default HealthPlan;
