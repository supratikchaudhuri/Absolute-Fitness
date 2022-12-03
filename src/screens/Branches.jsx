import React, { useEffect } from 'react';

import {
	MDBCard,
	MDBCardImage,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBRow,
	MDBCol,
	MDBBtn
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Branches() {
	const navigate = useNavigate();

	const [branches, setBranches] = useState([])

	useEffect(() => {
		const getBranches = async () => {
			try {
				const res = await axios.get("gym/")
				await setBranches(res.data)

			} catch (err) {
				console.log(err);
			}
		}

		getBranches();
		
	}, [])
	console.log(branches);


  return (
    <div className='branches-div'>
      <h1>Our branches</h1>
      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      {
        branches.map(branch => (
          <MDBCol>
          <MDBCard className='h-100'	>
            <MDBCardImage
              src={branch.image_url}
              alt='...'
              position='top'
            />
            <MDBCardBody>
              <MDBCardTitle>{branch.location}</MDBCardTitle>
              <MDBCardText>
                <p>Phone: {branch.phone}</p>
								<p>{branch.state}</p>
								<p>{branch.zip}</p>
								<p>Membership Fee: ${branch.membership_fee}</p>
              </MDBCardText>

							<div>
								<MDBBtn onClick={e => navigate(`../gym/${branch.gym_id}/facilities`)}>View Facilities</MDBBtn>
								<MDBBtn onClick={e => navigate(`../gym/${branch.gym_id}/trainers`)}>View Trainers</MDBBtn>
							</div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        ))
      }
    </MDBRow>
    </div>
  )
}

export default Branches





// const branches = [
	// 	{
	// 		address: "123 ewqe eqweqwe, qweqwe",
	// 		image: "https://www.tripsavvy.com/thmb/UfG0_2WB67pErEqfIQMvEjV4W20=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-947698310-1729da81e58f40058a9e45ba82532d57-2f992696318c42cbbd595ef3ec1043fd.jpg", 
	// 		city: "LA", 
	// 		state: "CA", 
	// 		zip: 1111
	// 	}, {
	// 		address: "123 ewqe eqweqwe, qweqwe",
	// 		image: "https://www.travelandleisure.com/thmb/ATskoUEBblzpBKlym1lPV4J1m-s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/san-diego-california-SDTG0221-7d1cfd65a826426d8cc7f6e41345ac19.jpg", 
	// 		city: "San Diego", 
	// 		state: "CA", 
	// 		zip: 1111
	// 	}, {
	// 		address: "123 ewqe eqweqwe, qweqwe",
	// 		image: "https://cdn.getyourguide.com/img/location/533597d7653a9.jpeg/99.jpg", 
	// 		city: "Boston", 
	// 		state: "MA", 
	// 		zip: 1111
	// 	}, {
	// 		address: "123 ewqe eqweqwe, qweqwe",
	// 		image: "https://media.nomadicmatt.com/2022/newnycguidemain.jpeg", 
	// 		city: "New York City", 
	// 		state: "NY", 
	// 		zip: 1111
	// 	}, {
	// 		address: "123 ewqe eqweqwe, qweqwe",
	// 		image: "https://www.gannett-cdn.com/presto/2022/06/01/NAAS/f757462d-1524-4040-8512-7ecf9ee3b391-austin_skyline.JPG", 
	// 		city: "Austin", 
	// 		state: "TX", 
	// 		zip: 1111
	// 	}
	// ]