import axios from "axios";
import React, { useState } from "react";
import Table from "../components/Table";
import AlertBox from "../components/AlertBox";

const NutrionIX = () => {
  const [query, setQuery] = useState(
    "1 chicken salad, 1 cup orange juice, 2 scoops whey protein"
  );
  const interest = [
    "food_name",
    "serving",
    "protein",
    "carbohydtrates",
    "saturated_fat",
    "total_fat",
    "calories",
    "cholesterol",
    "sodioum",
    "fibre",
    "potassium",
  ];
  const [nutrients, setNutrients] = useState(null);

  const fetchNutritionDate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          query: query,
        },
        {
          headers: {
            "x-app-id": process.env.REACT_APP_NUTRITIONIX_APP_ID,
            "x-app-key": process.env.REACT_APP_NUTRITIONIX_API_KEY,
            "x-remote-user-id": "0",
          },
        }
      );
      const foods = res.data.foods;
      const selectedData = foods.map((food) => {
        const selectedObject = {};
        Object.keys(food).forEach((key) => {
          const matchingInterest = interest.find((interestKey) =>
            key.includes(interestKey)
          );
          if (matchingInterest) {
            selectedObject[key] = food[key];
          }
        });

        return selectedObject;
      });

      setNutrients(selectedData);
    } catch (err) {
      alert("No data found");
    }
  };

  return (
    <div className="container">
      <form
        className="center form-control p-3 mb-3"
        onSubmit={fetchNutritionDate}
      >
        {/* <div className="row"> */}
        <textarea
          className="form-control"
          rows="3"
          name="query"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your food items here"
          required
        >
          {query}
        </textarea>

        <button className="mt-2 btn btn-primary" type="submit">
          Check Nutrition Content
        </button>
        {/* </div> */}
      </form>

      {nutrients && nutrients.length && (
        <>
          <Table data={nutrients} />
          <AlertBox
            message="Data shown are approximate values. It is not 100% accurate."
            type="warning"
          />
        </>
      )}
    </div>
  );
};

export default NutrionIX;
