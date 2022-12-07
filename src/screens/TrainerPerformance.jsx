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

  console.log(clientHealthRecords);

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
          obj["bmi" + (i + 1)] = record["bmi"];
          dateWiseData.push(obj);
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
    console.log(dateWiseData);
    return dateWiseData
  }

  


  return (
    clientHealthRecords 
    ?
    <div>
      {
        clientHealthRecords.length >= 1 
        && 
        <BMIChart data={processData(clientHealthRecords)} numClients={clientHealthRecords.length}></BMIChart>
      }
    </div>
    :
    <p>This trainer has no clients yet.</p>
  )
}

export default TrainerPerformance