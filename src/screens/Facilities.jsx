import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Facilities() {
  const [facilities, setFacilities] = useState({});

  useEffect(() => {
    const getAllFacilities = async () => {
      try {
        const res = axios.get();
        setFacilities(res.data);
        console.log(facilities);
      } catch (err) {
        console.log(err);
      }
    }

    getAllFacilities();
  }, [])

  return (
    <p>{facilities}</p>
  )
}

export default Facilities