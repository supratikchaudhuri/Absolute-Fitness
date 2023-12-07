import React, { useEffect, useState } from "react";
import BMIChart from "../components/BMIChart";
import { addHealthRecord, getHealthRecordForUser } from "../api/healthRecord";

function MemberHealthRecord() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [memberHealthRecord, setMemberHealthRecord] = useState([]);
  const [showHealthRecordForm, setShowHealthRecordForm] = useState(false);
  const [newHealthRecord, setNewHealthRecord] = useState({
    height: "",
    weight: "",
    dateCalculated: "",
  });

  const handleChange = (e) => {
    setNewHealthRecord((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHealthRecord = async (e) => {
    e.preventDefault();
    if (newHealthRecord.height < 0 || newHealthRecord.weight < 0) {
      alert("Values cannot be negative");
      return;
    }

    const status = await addHealthRecord({
      ...newHealthRecord,
      email: user.email,
    });
    console.log(newHealthRecord);
    if (status === 200) {
      getHealthRecords();
      setShowHealthRecordForm(false);
    }
  };

  console.log(memberHealthRecord);

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
  };

  const getHealthRecords = async () => {
    const res = await getHealthRecordForUser(user.email);
    setMemberHealthRecord(res);
  };

  useEffect(() => {
    getHealthRecords();
  }, []);

  const memberHealtRecordDataRender = (
    <div className="w-100">
      <div>
        <BMIChart data={getMemberBMIData(memberHealthRecord)}></BMIChart>
      </div>

      <div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            getHealthRecords();
            setShowHealthRecordForm(true);
          }}
          outline
        >
          Submit Health Record
        </button>
      </div>
    </div>
  );
  console.log(memberHealthRecord);

  const noMemberHealthRecordRender = (
    <div>
      <p>No health record Found.</p>

      <button
        className="btn btn-primary "
        onClick={(e) => setShowHealthRecordForm(true)}
      >
        Add health record
      </button>
    </div>
  );

  const healthRecordForm = showHealthRecordForm && (
    <form
      className="form-group health-record-form"
      onSubmit={(e) => submitHealthRecord(e)}
    >
      <h5>Please enter the following records</h5>

      <div className="mb-3">
        <label for="height-input" className="form-label">
          Height in cm
        </label>
        <input
          type="number"
          className="form-control"
          id="height-input"
          name="height"
          placeholder="Enter height in cm"
          onChange={(e) =>
            setNewHealthRecord({ ...newHealthRecord, height: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label for="weight-input" className="form-label">
          Weight in kg
        </label>
        <input
          type="number"
          className="form-control"
          id="weight-input"
          name="weight"
          placeholder="Enter weight in kg"
          onChange={(e) =>
            setNewHealthRecord({ ...newHealthRecord, weight: e.target.value })
          }
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="date-input" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="date-input"
          max={new Date().toJSON().slice(0, 10)}
          name="dateCalculated"
          onChange={(e) =>
            setNewHealthRecord({
              ...newHealthRecord,
              dateCalculated: e.target.value,
            })
          }
          required
        />
      </div>

      <div className="d-flex justify-content-around">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={(e) => {
            getHealthRecords();
            setShowHealthRecordForm(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const dispplayMemberHealthRecord = () => {
    return (
      <>
        {healthRecordForm}

        <div className="container">
          {memberHealthRecord.length === 0
            ? noMemberHealthRecordRender
            : memberHealtRecordDataRender}
        </div>
      </>
    );
  };

  return dispplayMemberHealthRecord();
}

export default MemberHealthRecord;
