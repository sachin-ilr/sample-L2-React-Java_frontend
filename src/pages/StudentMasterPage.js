import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { fetchData, postData, deleteData } from "../service/api";

const StudentMasterPage = () => {
  const [studentMasters, setStudentMasters] = useState([]);
  const [newStudentMaster, setNewStudentMaster] = useState({
    id: "",
    name: "",
    details: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const fetchStudentMasters = () => {
    fetchData("/api/student-master")
      .then((data) => setStudentMasters(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStudentMasters();
  }, []);

  const handleAddStudentMaster = () => {
    postData("/api/student-master", newStudentMaster)
      .then(() => {
        fetchStudentMasters();
        setNewStudentMaster({ id: "", name: "", details: "" });
        setIsAdding(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteStudentMaster = (id) => {
    deleteData(`/api/student-master/${id}`)
      .then(() => fetchStudentMasters())
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setNewStudentMaster({
      ...newStudentMaster,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Student Master Page</h2>
      {isAdding ? (
        <div>
          <input
            name="id"
            placeholder="ID"
            value={newStudentMaster.id}
            onChange={handleInputChange}
          />
          <input
            name="name"
            placeholder="Name"
            value={newStudentMaster.name}
            onChange={handleInputChange}
          />
          <input
            name="details"
            placeholder="Details"
            value={newStudentMaster.details}
            onChange={handleInputChange}
          />
          <button onClick={handleAddStudentMaster}>Submit</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Record</button>
      )}
      <Table
        columns={["ID", "Name", "Details"]}
        data={studentMasters}
        onEdit={(studentMaster) => console.log("Edit", studentMaster)}
        onDelete={handleDeleteStudentMaster}
      />
    </div>
  );
};

export default StudentMasterPage;
