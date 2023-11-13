import axios from "axios";
import React, { useEffect, useState } from "react";

function WorkoutPlan() {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const res = await axios.get(`/workoutPlan/${user.email}`);
        console.log(res.data);
        setWorkoutPlan(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getWorkouts();
  }, []);
  console.log(workoutPlan);

  return (
    workoutPlan && (
      <div className="workout-plan plan">
        <h4 className="center">{workoutPlan.description}</h4>
        <h5>TOday's exceerecises</h5>

        <div className="workouts-div row">
          {workoutPlan.excercises.map((exc, index) => (
            <div
              className="col-xs-12 col-md-4 mt-3 ms-3 p-0 fit-content"
              key={index}
            >
              <div className="curved-border">
                <img
                  src={exc.imageUrl}
                  alt="excercise"
                  className="w-100"
                  style={{ "max-width": "400px" }}
                />
                <div className="p-3">
                  <h5 className="">{exc.excercise}</h5>
                  <p>
                    {exc.reps} Sets {exc.sets} Reps ea.
                  </p>
                  <p className="">You'll burn approximately "xx" calories.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default WorkoutPlan;
