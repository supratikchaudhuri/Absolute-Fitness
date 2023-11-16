import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BMIChart from "../../components/BMIChart";
import { getClientHealthRecords } from "../../api/trainer";

function TrainerPerformance() {
  const params = useParams();
  const { staffId } = params;

  const [clientHealthRecords, setClientHealthRecords] = useState(null);

  const getClientHealthRecordsForTrainer = async () => {
    const res = await getClientHealthRecords(staffId);
    console.log(res);
    setClientHealthRecords(res);
  };

  useEffect(() => {
    getClientHealthRecordsForTrainer();
  }, []);

  useEffect(() => {
    console.log("record changed");
  }, [clientHealthRecords]);

  const processData = (data) => {
    const dateWiseData = [];
    for (let i = 0; i < data.length; i++) {
      const healthRecords = data[i]["healthRecords"];
      healthRecords.forEach((record) => {
        let added = false;
        for (let j = 0; j < dateWiseData.length; j++) {
          if (
            new Date(dateWiseData[j]["date"]).getTime() ===
            new Date(record["dateCalculated"]).getTime()
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

    let numClients = clientHealthRecords.length;
    let prevBMI = {};

    for (let i = 0; i < numClients; i++) {
      for (let j = 0; j < dateWiseData.length; j++) {
        let record = dateWiseData[j];
        if (record["client" + (i + 1)]) {
          prevBMI["client" + (i + 1)] = record["client" + (i + 1)];
          break;
        }
      }
    }

    for (let j = 0; j < dateWiseData.length; j++) {
      let record = dateWiseData[j];
      for (let i = 0; i < numClients; i++) {
        if (record["client" + (i + 1)]) {
          prevBMI["client" + (i + 1)] = record["client" + (i + 1)];
        } else {
          record["client" + (i + 1)] = prevBMI["client" + (i + 1)];
        }
      }
    }
    return dateWiseData;
  };

  return clientHealthRecords ? (
    <div className="container center">
      {clientHealthRecords.length >= 1 ? (
        <>
          <h4>
            This graph displays the progress{}'s clients have made so far since
            working with him
          </h4>
          <BMIChart
            data={processData(clientHealthRecords)}
            numClients={clientHealthRecords.length}
          ></BMIChart>
        </>
      ) : (
        <div className="no-data">No client progress for this trainer found</div>
      )}
    </div>
  ) : (
    <div className="no-data">This trainer has no clients yet.</div>
  );
}

export default TrainerPerformance;
