import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AlertBox from "../components/AlertBox";

function GymMembers() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [members, setMembers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const displayEditForm = (e) => {
    setShowEditForm(true);
  };

  const getMembers = async () => {
    try {
      const res = await axios.get(`/gym/${user.gym_id}/members`);
      res.data.map((obj) => (obj.dob = obj.dob.substring(0, 10)));
      setMembers(res.data);
    } catch (err) {
      alert(err.response.data.msg || err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = axios.
    } catch (err) {
      alert(err.response.data.msg || err);
    }

    setShowEditForm(false);
  };

  const deleteUser = async (e, email) => {
    console.log(email);
    try {
      await axios.delete(`/user/${email}`);
      getMembers();
      alert("Member successfuly deleted !");
    } catch (err) {
      alert(err.response.data.msg || err);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  console.log(members);

  const search = (e) => {
    e.preventDefault();
    const input = document.querySelector("input").value;
    if (input === "") {
      getMembers();
    } else {
      const filteredMembers = members.filter((member) => {
        return (
          member.name.toLowerCase().includes(input.toLowerCase()) ||
          member.email.toLowerCase().includes(input.toLowerCase()) ||
          member.phone.toLowerCase().includes(input.toLowerCase())
        );
      });
      setMembers(filteredMembers);
    }
  };

  return members.length > 0 ? (
    <div className="gym-members-div">
      <form class="form-inline mb-3" onSubmit={search}>
        <div className="row mx-auto">
          <div className="col">
            <input
              class="form-control"
              type="search"
              placeholder="Search name, email or phone"
              aria-label="Search"
            />
          </div>
          <div className="col ms-auto">
            <button class="btn btn-outline-success" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </form>
      <Table
        content="members"
        data={members}
        deleteItem={deleteUser}
        displayEditForm={displayEditForm}
      ></Table>
    </div>
  ) : (
    <AlertBox message={"No member data found"} type="danger" />
  );
}

export default GymMembers;
