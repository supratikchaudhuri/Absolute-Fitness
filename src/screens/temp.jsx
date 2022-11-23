import React, { useEffect } from 'react';
import axios from 'axios';

function foo() {
  
  const gymAddressId = {}
  

  useEffect(() => {
    // getting all gym locations 
    const getAllGyms = async () => {
      try {
        const res = await axios.get("gym/");
        const gymData = res.data;
        
        gymData.forEach(gym => {
          gymAddressId[gym.address] = gym.id
        })
        console.log(gymAddressId);
      } catch (err) {
        console.log(err);
      }
    }

    getAllGyms();

  }, [gymAddressId])


  return (
    
    <select name='gymId' onChange={handleChange} value={formValue.gymId}>
    <option value="-1">--Select Gym Address--</option>
    {
      Object.keys(gymAddressId).map((address, idx) => (
        <option key={address} value={gymAddressId[address]}>{address}</option>
      ))
    }
    </select>
                
                
  );
}

export default foo;