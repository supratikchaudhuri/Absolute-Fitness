import React from 'react'
import CardGridMeals from '../components/CardGridMeals'
import Navbar from '../components/Navbar'

function MealPlan() {
  const meals = [
		{
			name: "salad",
			sets: 4,
			reps : "8-10",
			desciption: "do not move elbows",
			image: "https://static.onecms.io/wp-content/uploads/sites/44/2021/08/16/chopped-power-salad-with-chicken.jpg"
		}, 
		{
			name: "fruits",
			sets: 2,
			reps : "8-10",
			desciption: "do not bend back do not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend backdo not bend back  ",
      image: "https://media.istockphoto.com/id/1313361282/photo/mexican-rice-and-chorizo-sausage-wrap.jpg?s=612x612&w=0&k=20&c=7BgOT-kuluQIlZ50l-p-DNvajA66EeB_HIUvW6O_GPM="
		}
	]

  return (
	<>
	<Navbar/>
    <div className='plan mealPlan'>
		<h3>Monday</h3>
    	<h5>Focus: Ches & Triceps</h5>
    	<CardGridMeals meals = {meals}></CardGridMeals>

		<h3>Monday</h3>
    	<h5>Focus: Ches & Triceps</h5>
    	<CardGridMeals meals = {meals}></CardGridMeals>

		<h3>Monday</h3>
    	<h5>Focus: Ches & Triceps</h5>
    	<CardGridMeals meals = {meals}></CardGridMeals>

		<h3>Monday</h3>
    	<h5>Focus: Ches & Triceps</h5>
    	<CardGridMeals meals = {meals}></CardGridMeals>

    </div>
	</>
  )
}

export default MealPlan