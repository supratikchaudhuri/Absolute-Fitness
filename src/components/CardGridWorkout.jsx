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

function CardGridWorkout({workouts}) {
	console.log(workouts);
	
  return (
    <MDBRow className='row-cols-1 row-cols-md-3 g-4 .h'>
			{
				workouts.map((exc) => (
					<MDBCol>
						<MDBCard className='h-100'>
							<MDBCardImage
								src={exc.imageUrl}
								alt='...'
								position='top'
							/>
							<MDBCardBody>
								<MDBCardTitle>{exc.excercise}</MDBCardTitle>
								<MDBCardText>
									{exc.reps} Sets {exc.sets} Reps Each.
									{/* <p>{exc.desciption}</p> */}
								</MDBCardText>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				))
			}
      
    </MDBRow>
  )
}

export default CardGridWorkout;