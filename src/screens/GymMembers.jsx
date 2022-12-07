import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '../components/Table';

function GymMembers() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [members, setMembers] = useState(null);

  useEffect(() => {
    const getMembers = async() => {
      try {
        const res = await axios.get(`/gym/${user.gym_id}/members`);
        setMembers(res.data);
      }
      catch(err) {
        console.log(err);
      }
    }

    getMembers();
    // setMembers(dummyMembers)

  }, [])
  console.log(members);

  

  return (
    members 
    ?
    <div className='gym-members-div'>
      GymMembers

      <Table content='members' data={members}></Table>
    </div>
    :
    <div>No members in this gym yet</div>
    
  )
}

export default GymMembers