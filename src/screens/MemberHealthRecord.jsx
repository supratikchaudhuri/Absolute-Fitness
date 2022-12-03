import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import BMIChart from '../components/BMIChart'

function MemberHealthRecord() {
  const [memberHealthRecord, setMemberHealthRecord] = useState(null);

  const user = localStorage.getItem('user');
  console.log(user);

  const dummyData = [
    {
      name: "11 nov",
      uv: 4000,
      pv: 2400,
      amt: 2400,
      ram: 5000
    },
    {
      name: "11 dec",
      uv: 3000,
      pv: 1398,
      amt: 3600,
      ram: 5000
    },
    {
      name: "11 jan",
      uv: 2000,
      pv: 9800,
      // amt: 2290,
      ram: 5000
    },
    {
      name: "11 feb",
      uv: 2780,
      pv: 3908,
      // amt: 2000,
      ram: 5000
    },
    {
      name: "11 mar",
      uv: 1890,
      pv: 4800,
      // amt: 2181,
      // ram: 5000
    },
    {
      name: "11 apr",
      uv: 2390,
      pv: 3800,
      // amt: 2500,
      ram: 5000
    },
    {
      name: "11 may",
      uv: 3490,
      pv: 4300,
      // amt: 2100,
      ram: 5000
    }
  ];

  useEffect(() => {
    const getHealthRecord = async () => {
      const res = await axios.get(`${user.phone}/health-record`);
      // setMemberHealthRecord(res.data);

      setMemberHealthRecord(dummyData)
      
    }

    getHealthRecord()
  }, [])

  const memberHealtRecordDataRender = (
    <div>
        <p>height:  weight: w</p>
        <p>health record last updated: </p>

      <div><BMIChart data={memberHealthRecord}></BMIChart></div>

      <div>
        <MDBBtn outline color='warning'>
          Update Health Record
        </MDBBtn>
      

      <MDBBtn>See Health Progreess</MDBBtn></div>
    </div>
  )

  const noMemberHealthRecordRender = (
    <>
      <p>No health record Found.</p>

      <MDBBtn>Please add health record.</MDBBtn>
    </>
  )

  const dispplayMemberHealthRecord = () => {
    return (
      <div className='memerHealthRecordDiv'>
        { memberHealthRecord ? memberHealtRecordDataRender : noMemberHealthRecordRender }
      </div>
    )
    
  }

  return (
    
    dispplayMemberHealthRecord() 
    
  )
}

export default MemberHealthRecord