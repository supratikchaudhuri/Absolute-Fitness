import React, { useEffect, useState } from "react";
import { getWorkoutPlanForUser } from "../../api/workoutPlan";

function WorkoutPlan() {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const getWorkouts = async () => {
    const data = await getWorkoutPlanForUser(user.username);
    setWorkoutPlan(data);
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  console.log(workoutPlan);

  return (
    workoutPlan && (
      <div className="container d-flex flex-column align-items-center">
        <h4 className="page-title mt-2">Today's exceerecises</h4>
        <h5 className=" center mt-2">{workoutPlan.description}</h5>

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
