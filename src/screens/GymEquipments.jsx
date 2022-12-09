import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '../components/Table';
import { MDBCol, MDBInput, MDBRow, MDBBtn} from 'mdb-react-ui-kit';

function GymEquipments() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [equipments, setEquipments] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedEquipment, setUpdatedEquipment] = useState({name: '', quantity: '', last_serviced: '', image_url: ''});

  const getGymEquipments = async() => {
    try {
      const res = await axios.get(`/gym/${user.gym_id}/equipments`)
      setEquipments(processEquipmentData(res.data));
    }
    catch(err) {
      alert(err.response.data.msg);
    }
  }

  useEffect(() => {
    getGymEquipments();
    // setEquipments(processEquipmentData(dummy))

  }, [])



  const dummy = [
    {
      gym_id: 1, 
      name: 'bar bell', 
      image_url: 'https://i.insider.com/5ecd774d3ad86143d7681736?width=1200&format=jpeg', 
      quantity: 10, 
      last_serviced: '2022-11-11'
    },
    {
      gym_id: 1, 
      name: 'bar bell', 
      image_url: 'https://i.insider.com/5ecd774d3ad86143d7681736?width=1200&format=jpeg',  
      quantity: 10, 
      last_serviced: '2022-11-11'
    },
    {
      gym_id: 1, 
      name: 'bar bell', 
      image_url: 'https://p.globalsources.com/IMAGES/PDT/B5180629601/Treadmill.png', 
      quantity: 10, 
      last_serviced: '2022-11-11'
    },
    {
      gym_id: 1, 
      name: 'bar bell', 
      image_url: 'https://i.insider.com/5ecd774d3ad86143d7681736?width=1200&format=jpeg', 
      quantity: 10, 
      last_serviced: '2022-11-11'
    },
    {
      gym_id: 1, 
      name: 'bar bell', 
      image_url: 'https://truefitness.com/wp-content/uploads/2019/11/SPL0300-Acrylic-Alabaster_960-1.png',  
      quantity: 10, 
      last_serviced: null
    },
    {
      gym_id: 1, 
      name: 'bar bell', 
      image_url: 'https://i.insider.com/5ecd774d3ad86143d7681736?width=1200&format=jpeg',
      quantity: 10, 
      last_serviced: null
    },

  ]

  const processEquipmentData = (equipmentData) => {
    let updatedEquipmentData = [];
    for(let i = 0; i < equipmentData.length; i++) {
      let record = equipmentData[i];
      let updatedRecord = record
      updatedRecord["image_url"] = <img src={record["image_url"]}/>
      delete updatedRecord.gym_id   
      updatedEquipmentData.push(updatedRecord)
    }
    // console.log(upda);
    setUpdatedEquipment(updatedEquipmentData[0])
    return updatedEquipmentData
  }

  const updateEquipment = async () => {
    try {
      const res = await axios.put(``, updatedEquipment);
    } 
    catch(err) {
      alert(err.response.data.msg);
    }
  }

  const handleChange = (e) => {
    console.log(e.target.name);
    setUpdatedEquipment({...updatedEquipment, [e.target.name]: e.target.value})
  }

  const renderEditForm = (
    <div className='edit-form-div' style={{display: showEditForm ? 'inline' : 'none'}}>
      <form className='m-4 popup-form' onSubmit={updateEquipment}>

        <MDBInput className='mb-3' label='name' name='name' value={updatedEquipment.name} onChange={handleChange}/>
       
        <MDBRow className='mb-4 w-3'>
          <MDBCol>
            <MDBInput label='quantity' name='quantity' value={updatedEquipment.quantity} onChange={handleChange}/>
          </MDBCol>
          <MDBCol>
            <MDBInput label='Last Serviced' type='date' size="md" onChange={handleChange}
              name='last_serviced' value={updatedEquipment.last_serviced ? updatedEquipment.last_serviced : ''} 
              max={new Date().toJSON().slice(0, 10)}/>
          </MDBCol>
        </MDBRow>

        {updatedEquipment.image_url.props
          && <MDBInput className='mb-3' label='Image URL' value={updatedEquipment.image_url.props.src} onChange={handleChange}/>}

        <MDBBtn type='submit' className='mb-0' block>
          Update
        </MDBBtn>
        <MDBBtn type='button' color='danger' onClick={e => setShowEditForm(false)} className='mb-0' block>
          Cancel
        </MDBBtn>
      </form>
    </div>
  )


  return (
    equipments.length > 0
    ?
    <div className='euipment-div'>
      {renderEditForm}
      <Table 
        content='equipments' 
        data={equipments} 
        setEquipments={processEquipmentData} 
        displayEditForm={setShowEditForm}
      />
    </div>
    :
    <div className='no-data'>No equipment data found</div>
  )
}

export default GymEquipments