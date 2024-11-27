import React, { useState, useEffect } from "react";
import Table from "../components/table";
import { fetchData, postData, deleteData } from "../service/api";

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: "",
    mobileno: "",
    address: "",
    subjectexpert: "",
  });
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
        setNewStaff({
          name: "",
          mobileno: "",
          address: "",
          subjectexpert: "",
        });
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
      <h2>Staff</h2>
      {isAdding ? (
        <div>
          <input
            name="name"
            placeholder="Name"
            value={newStaff.name}
            onChange={handleInputChange}
          />
          <input
            name="mobileno"
            placeholder="Mobile No"
            value={newStaff.mobileno}
            onChange={handleInputChange}
          />
          <input
            name="address"
            placeholder="Address"
            value={newStaff.address}
            onChange={handleInputChange}
          />
          <input
            name="subjectexpert"
            placeholder="Subject Expert"
            value={newStaff.subjectexpert}
            onChange={handleInputChange}
          />
          <button onClick={handleAddStaff}>Submit</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Staff</button>
      )}
      <Table
        columns={["Name", "Mobile No", "Address", "Subject Expert"]}
        data={staff}
        onDelete={handleDeleteStaff}
      />
    </div>
  );
};

export default StaffPage;
