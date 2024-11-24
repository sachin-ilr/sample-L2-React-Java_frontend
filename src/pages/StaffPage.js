import React, { useState, useEffect } from "react";
import Table from "../components/table";
import { fetchData, postData, deleteData } from "../service/api";

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", position: "" });
  const [isAdding, setIsAdding] = useState(false);

  const fetchStaff = () => {
    fetchData("/api/staff")
      .then((data) => setStaff(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = () => {
    postData("/api/staff", newStaff)
      .then(() => {
        fetchStaff();
        setNewStaff({ name: "", position: "" });
        setIsAdding(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteStaff = (id) => {
    deleteData(`/api/staff/${id}`)
      .then(() => fetchStaff())
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Staff Page</h2>
      {isAdding ? (
        <div>
          <input
            name="name"
            placeholder="Staff Name"
            value={newStaff.name}
            onChange={handleInputChange}
          />
          <input
            name="position"
            placeholder="Position"
            value={newStaff.position}
            onChange={handleInputChange}
          />
          <button onClick={handleAddStaff}>Submit</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Staff</button>
      )}
      <Table
        columns={["Name", "Position"]}
        data={staff}
        onEdit={(staffMember) => console.log("Edit", staffMember)}
        onDelete={handleDeleteStaff}
      />
    </div>
  );
};

export default StaffPage;
