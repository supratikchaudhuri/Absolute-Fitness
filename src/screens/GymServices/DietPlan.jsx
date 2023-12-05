import React, { useEffect, useState } from "react";

import { getDietPlanForUser } from "../../api/dietPlan";
import AlertBox from "../../components/AlertBox";

function DietPlan() {
  const [mealPlan, setMealPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const getMeals = async () => {
    const data = await getDietPlanForUser(user.username);
    setMealPlan(data);
  };

  useEffect(() => {
    getMeals();
  }, []);

  return mealPlan ? (
    <div className="container d-flex flex-column align-items-center">
      <h4 className="page-title">{mealPlan.description}</h4>
      <div className="workout-plan mt-3">
        <h5 className="center">Today's Meals</h5>

        <div className="meals-div row">
          {mealPlan.meals.map((meal, index) => (
            <div
              className="col-xs-12 col-md-4 mt-3 ms-3 p-0 fit-content"
              key={index}
            >
              <div className="curved-border">
                <img
                  src={meal.imageUrl}
                  alt="meal"
                  style={{ "max-width": "400px" }}
                  className="w-100"
                />
                <div className="p-3">
                  <h5>
                    {index === 0
                      ? "Breakfast"
                      : index === 1
                      ? "Lunch"
                      : "Dinner"}
                  </h5>
                  <p>{meal.meal}</p>
                  <p className="text-muted">Calories: {meal.calories}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <AlertBox
      type="warning"
      message="You don't have a meal plan yet. Please contact your trainer."
    />
  );
}

export default DietPlan;
