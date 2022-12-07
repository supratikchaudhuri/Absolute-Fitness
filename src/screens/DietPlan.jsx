import React, { useEffect, useState } from 'react';
import CardGridMeals from '../components/CardGridMeals'

import axios from 'axios';

function DietPlan() {

const [mealPlan, setMealPlan] = useState(null);
const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		const getMeals = async () => {
			try {
				const res = await axios.get(`/dietPlan/${user.email}`);
				setMealPlan(res.data)
			} catch (err) {
				console.log(err);
			}
		}

		getMeals()
		
	}, [])
	// console.log(mealPlan);


  return (
		mealPlan && 
    <div className='plan mealPlan'>
			<h3>{mealPlan.description}</h3>

			<CardGridMeals meals = {mealPlan.meals}></CardGridMeals>

    </div>
  )
}

export default DietPlan