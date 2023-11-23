import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AlertBox from "../components/AlertBox";
import TreemapChart from "../components/TreeMap";

const NutrionIX = () => {
  const [query, setQuery] = useState(
    "1 chicken salad, 1 cup orange juice, 2 scoops whey protein"
  );
  const interest = [
    "food_name",
    "serving",
    "protein",
    "carbohydrate",
    "saturated_fat",
    "total_fat",
    "calories",
    "cholesterol",
    "sodium",
    "dietary_fiber",
    "potassium",
    "sugar",
  ];

  const [nutrients, setNutrients] = useState([]);

  const initialTotalValues = {
    protein: 0,
    carbohydrate: 0,
    "saturated fat": 0,
    "total fat": 0,
    cholesterol: 0,
    // sodium: 0,
    "dietary fiber": 0,
    // potassium: 0,
    sugar: 0,
  };
  const [totalValues, setTotalValues] = useState(initialTotalValues);

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
      setTotalValues(initialTotalValues);
      const foods = res.data.foods;
      console.log(foods);
      const selectedData = foods.map((food) => {
        const selectedObject = {};
        Object.keys(food).forEach((key) => {
          const matchingInterest = interest.find((interestKey) =>
            key.includes(interestKey)
          );
          if (matchingInterest) {
            const newKey = matchingInterest.replace("_", " ");
            selectedObject[newKey] = food[key];

            if (newKey in totalValues && typeof food[key] === "number") {
              setTotalValues((prevValues) => ({
                ...prevValues,
                [newKey]: (prevValues[newKey] || 0) + food[key],
              }));
            }
          }
        });

        return selectedObject;
      });

      setNutrients(selectedData);
    } catch (err) {
      alert("No data found");
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(totalValues);
  }, [totalValues]);

  console.log(totalValues);

  return (
    <div className="m-4">
      <form className=" form-control p-3 mb-3" onSubmit={fetchNutritionDate}>
        <label for="query-ta">Enter items: </label>
        <textarea
          id="query-ta"
          className="form-control mt-1"
          rows="3"
          name="query"
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Enter your food items here ${"("}ex: "1 chicken salad, 1 cup orange juice, 2 scoops whey protein)"`}
          required
        >
          {query}
        </textarea>

        <button className="mt-2 btn btn-primary" type="submit">
          Check Nutrition Content
        </button>
      </form>

      {nutrients.length > 0 && (
        <>
          <Table data={nutrients} content="nutrition" />
          <AlertBox
            message="Data shown are approximate values. It is not 100% accurate."
            type="warning"
          />
        </>
      )}
      {totalValues !== initialTotalValues && (
        <TreemapChart dataObj={totalValues} />
      )}
    </div>
  );
};

export default NutrionIX;
