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

function CardGridWorkout() {

	const excercise = [
		{
			name: "bicep curl",
			sets: 4,
			reps : "8-10",
			desciption: "do not move elbows",
			image: "https://cdn.mos.cms.futurecdn.net/KiVkucwRFwiqVGdt2xatS8-1200-80.jpg"
		}, 
		{
			name: "squats",
			sets: 2,
			reps : "8-10",
			desciption: "do not bend back"
		}
	]
  return (
    <MDBRow className='row-cols-1 row-cols-md-3 g-4 .h'>
			{
				excercise.map((exc) => (
					<MDBCol>
						<MDBCard className='h-100'>
							<MDBCardImage
								src='https://cdn.mos.cms.futurecdn.net/KiVkucwRFwiqVGdt2xatS8-1200-80.jpg'
								alt='...'
								position='top'
							/>
							<MDBCardBody>
								<MDBCardTitle>{exc.name}</MDBCardTitle>
								<MDBCardText>
									{exc.sets} Sets {exc.reps} Reps Each.
									<p>{exc.desciption}</p>
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