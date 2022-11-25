import React, { useEffect } from 'react';

import {
	MDBCard,
	MDBCardImage,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBRow,
	MDBCol
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';

function Branches() {

	const [branches, setBranches] = useState([])

	useEffect(() => {
		const getBranches = async () => {
			try {
				const res = await axios.get("gym/")
				setBranches(res.data)
				console.log(branches);
			} catch (err) {
				console.log(err);
			}
		}

		getBranches();
		
	}, [])

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
	const handleClick = (e) => {
		
	}

  return (
    <div className='BranchesDiv'>
      <h1>Choose location and their price plans</h1>
      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      {
        branches.map(branch => (
          <MDBCol>
          <MDBCard className='h-100' onClick={handleClick}>
            {/* <MDBCardImage
              src={branch.image}
              alt='...'
              position='top'
            /> */}
            <MDBCardBody>
              <MDBCardTitle>{branch.location}</MDBCardTitle>
              <MDBCardText>
                <p>{branch.phone}</p>
								{/* <p>{branch.state}</p>
								<p>{branch.zip}</p> */}
                This is a longer card with supporting text below as a natural lead-in to additional content.
                This content is a little bit longer.
              </MDBCardText>
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