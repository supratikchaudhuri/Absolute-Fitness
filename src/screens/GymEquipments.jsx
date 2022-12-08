import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '../components/Table';

function GymEquipments() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [equipments, setEquipments] = useState([])

  const getGymEquipments = async() => {
    try {
      const res = await axios.get(`/gym/${user.gym_id}/equipments`)
      setEquipments(processEquipmentData(res.data));
    }
    catch(err) {
      alert(err.response.data.msg);
    }
  }

  const processEquipmentData = (equipmentData) => {
    let updatedEquipmentData = [];
    for(let i = 0; i < equipmentData.length; i++) {
      let record = equipmentData[i];
      let updatedRecord = record
      updatedRecord["image_url"] = <img src={record["image_url"]}/>
      delete updatedRecord.gym_id   
      updatedEquipmentData.push(updatedRecord)
    }
    console.log(updatedEquipmentData);
    return updatedEquipmentData
  }

  console.log(equipments);

  useEffect(() => {
    getGymEquipments();

  }, [])


  return (
    equipments.length > 0
    ?
    <div className='euipment-div'>
      <Table content='equipments' data={equipments}></Table>
    </div>
    :
    <div className='no-data'>No equipment data found</div>
  )
}

export default GymEquipments