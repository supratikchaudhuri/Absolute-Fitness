import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import AlertBox from "../components/AlertBox";
import { useParams } from "react-router-dom";
import { getGymMembers } from "../api/gym";
import { deleteGymUser } from "../api/user";

function GymMembers() {
  const { gymId } = useParams();
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    const res = await getGymMembers(gymId);
    setMembers(res);
  };

  const deleteUser = async (e, email) => {
    const ans = window.confirm("Are you sure you want to delete this member?");
    if (ans) {
      const status = await deleteGymUser(email);
      if (status === 200) {
        setMembers(members.filter((m) => m.email !== email));
      }
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

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
      <Table content="members" data={members} deleteItem={deleteUser}></Table>
    </div>
  ) : (
    <AlertBox message={"No member data found"} type="danger" />
  );
}

export default GymMembers;
