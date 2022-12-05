import React from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

function CardGridMeals({meals}) {
  console.log(meals);

  return (

    <MDBRow className='row-cols-1 row-cols-md-1 g-4 .h'>
      {
        meals.map((meal, idx) => (
          <MDBCol>
            <MDBCard>
              <MDBRow className='g-0'>
                <MDBCol md='3'>
                  <MDBCardImage 
                    src={meal.imageUrl} alt='...' 
                    fluid 
                    style={{height: "auto"}}
                  />
                </MDBCol>
                <MDBCol md='8'>
                  <MDBCardBody>
                    <MDBCardTitle>{idx == 0 ? 'Breakfast' : idx == 1 ? 'Lunch' : 'Dinner'}</MDBCardTitle>
                    <MDBCardText>
                      {meal.meal}
                    </MDBCardText>
                    <MDBCardText>
                      <small className='text-muted'>Calories: { meal.calories}</small>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        ))
      }
      
    </MDBRow>

  )
}

export default CardGridMeals





// <MDBRow className='row-cols-1 row-cols-md-1 g-4 .h'>
// 			{
// 				meals.map((meal) => (
// 					<MDBCol>
// 						<MDBCard>
//               <MDBRow className='g-0'>
//                 <MDBCol md='2'>
//                   <MDBCardImage 
//                     src={meal.image} alt='...' 
//                     fluid 
//                     style={{height: "auto"}}
//                   />
//                 </MDBCol>
//                 <MDBCol md='8'>
//                   <MDBCardBody>
//                     <MDBCardTitle>Breakfast: {meals.name}</MDBCardTitle>
//                     <MDBCardText>
//                       {meal.description}
//                     </MDBCardText>
//                     <MDBCardText>
//                       <small className='text-muted'>Last updated 3 mins ago</small>
//                     </MDBCardText>
//                   </MDBCardBody>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCard>
// 					</MDBCol>
// 				))
// 			}
      
//     </MDBRow>