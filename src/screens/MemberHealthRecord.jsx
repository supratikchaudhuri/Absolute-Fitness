import axios from 'axios';

import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

import React, { useEffect, useState } from 'react'
import BMIChart from '../components/BMIChart'

function MemberHealthRecord() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [memberHealthRecord, setMemberHealthRecord] = useState([]);
  const [showHealthRecordForm, setShowHealthRecordForm] = useState(false);
  const [latestHealthRecord, setLatestHealthRecord] = useState({ height: '', weight: '', dateCalculated: ''})
  
  const handleChange = (e) => {
    setLatestHealthRecord(prevState => ({...prevState, [e.target.name]: e.target.value}));
  }

  const submitHealthRecord = async () => {
    try {
      console.log(latestHealthRecord);
      const res = await axios.post(`user/${user.email}/healthRecord`, {...latestHealthRecord, email: user.email});
      getHealthRecords()
      setShowHealthRecordForm(false);
      console.log(res);
    } 
    catch (err) {
      console.log(err);
    }
  }

  const getMemberBMIData = (memberHealthRecord) => {
    memberHealthRecord.map((record) => {
        const thisDate = new Date(record.date_calculated);
        record.date =
            thisDate.getFullYear() +
            "-" +
            (thisDate.getMonth() + 1) +
            "-" +
            thisDate.getDate();

        delete record["record_id"];
        delete record["email"];
        delete record["date_calculated"];
    });

    return memberHealthRecord;
  }

  const getHealthRecords = async () => {
    const res = await axios.get(`user/${user.email}/healthRecords`);
    setMemberHealthRecord(res.data);
  }

  useEffect(() => {
    getHealthRecords();
  }, [])
  console.log(memberHealthRecord);



  const memberHealtRecordDataRender = (
    <div>
      <div><BMIChart data={getMemberBMIData(memberHealthRecord)}></BMIChart></div>

      <div>
        <MDBBtn onClick={e => setShowHealthRecordForm(true)} outline color='warning'>
          Add Latest Health Record
        </MDBBtn>
      
      </div>
    </div>
  )

  const noMemberHealthRecordRender = (
    <div>
      <p>No health record Found.</p>

      <MDBBtn color='warning' onClick={e => setShowHealthRecordForm(true)}>Add health record</MDBBtn>
    </div>
  )

  const healthRecordForm = (
    <MDBCard border='warning' style={{display: showHealthRecordForm ? 'inline' : 'none'}} className='mb-3 health-record-form'>
      <MDBCardBody className='text'>
        <MDBCardTitle>Please enter the following records</MDBCardTitle>

        <MDBInput label='Height in cm' id='typeText' type='text' name='height' onChange={handleChange}/>
        <MDBInput label='Weight in lbs' id='typeText' type='text' name='weight' onChange={handleChange}/>
        <MDBInput wrapperClass='col-md-10 mb-3' label='Date' type='date' size="lg"
                    onChange={handleChange} name='dateCalculated'  value={latestHealthRecord.date}/>
      </MDBCardBody>
     
    <div>
      <MDBBtn color='warning' onClick={submitHealthRecord}>Submit</MDBBtn>
      <MDBBtn color='danger' onClick={e => setShowHealthRecordForm(false)}>Cancle</MDBBtn>
    </div>

    </MDBCard>
  )

  const dispplayMemberHealthRecord = () => {
    return (
      <>
        {healthRecordForm}
        
        <div className='memerHealthRecordDiv'>
        { memberHealthRecord ? memberHealtRecordDataRender : noMemberHealthRecordRender }
        </div>
      </>
    )
    
  }

  return (
    
    dispplayMemberHealthRecord() 
    
  )
}

export default MemberHealthRecord