import React, { useEffect, useState } from "react";

import axios from "axios";

function DietPlan() {
  const [mealPlan, setMealPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getMeals = async () => {
      try {
        const res = await axios.get(`/dietPlan/${user.email}`);
        setMealPlan(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMeals();
  }, []);

  return (
    mealPlan && (
      <div className="meal-plan plan ">
        <h4 className="center">{mealPlan.description}</h4>
        <div className="workout-plan mt-3">
          <h5>Today's Meals</h5>

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
    )
  );
}

export default DietPlan;
