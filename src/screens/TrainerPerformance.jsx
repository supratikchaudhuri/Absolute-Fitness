import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BMIChart from '../components/BMIChart';

function TrainerPerformance() {
  const params = useParams()
  const { staffId } = params

  const [clientHealthRecords, setClientHealthRecords] = useState(null);

  const getClientHealthRecords = async() => {
    try {
      const res = await axios.get(`/trainer/${staffId}/memberRecords`)
      setClientHealthRecords(res.data)
      console.log(res.data);
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getClientHealthRecords()
  }, [])

  useEffect(() => {
    console.log("record changed");
  }, [clientHealthRecords])

  const processData = (data) => {

    const dateWiseData = [];
    for (let i = 0; i < data.length; i++) {
      const healthRecords = data[i]["healthRecords"];
      healthRecords.forEach((record) => {
        let added = false;
        for (let j = 0; j < dateWiseData.length; j++) {
          if (
            new Date(dateWiseData[j]["date"]).getTime() === new Date(record["dateCalculated"]).getTime()
          ) {
            dateWiseData[j]["bmi" + (i + 1)] = record["bmi"];
            added = true;
            break;
          }
        }
        if (!added) {
          const obj = {
              date: record["dateCalculated"].substring(0, 10),
          };
          obj["client" + (i + 1)] = record["bmi"];
          dateWiseData.push(obj);
          // console.log(obj);
        }
      });
    }
    dateWiseData.sort((a, b) => {
      const dateA = new Date(a["date"]).getTime();
      const dateB = new Date(b["date"]).getTime();
      if (dateA < dateB) {
          return -1;
      } else if (dateA > dateB) {
          return 1;
      }
      return 0;
    });


    let numClients = clientHealthRecords.length
    let prevBMI = {};

    for(let i = 0; i < numClients; i++) {
      for(let j = 0; j < dateWiseData.length; j++) {
        let record = dateWiseData[j];
        if(record['client'+(i+1)]) {
          prevBMI['client'+(i+1)] = record['client'+(i+1)];
          break;
        }
      }
    }

    for(let j = 0; j < dateWiseData.length; j++) {
      let record = dateWiseData[j]
      for(let i = 0; i < numClients; i++) {
        if(record['client'+(i+1)]) {
          prevBMI['client'+(i+1)] = record['client'+(i+1)]
        }
        else {
          record['client'+(i+1)] = prevBMI['client'+(i+1)]
        }
      }
    }
    // console.log(dateWise);
    return dateWiseData
  }

  


  return (
    clientHealthRecords 
    ?
    <div className=''>
      <h4>This graph displays the progress {}'s clients have made so far since hirirng him</h4>
      {
        clientHealthRecords.length >= 1 
        && 
        <BMIChart data={processData(clientHealthRecords)} numClients={clientHealthRecords.length}></BMIChart>
      }
    </div>
    :
    <div className='no-data'>This trainer has no clients yet.</div>
  )
}

export default TrainerPerformance