import React, { useState, useEffect } from "react";
import Table from "../components/table";
import { fetchData, postData, deleteData } from "../service/api";

const StudentMasterPage = () => {
  const [studentMasters, setStudentMasters] = useState([]);
  const [newStudentMaster, setNewStudentMaster] = useState({
    firstname: "",
    lastname: "",
    roleno: "",
    subjectname: "",
    staffname: "",
    subjectcode: "",
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
        setNewStudentMaster({
          firstname: "",
          lastname: "",
          roleno: "",
          subjectname: "",
          staffname: "",
          subjectcode: "",
        });
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
      <h2>Student Master</h2>
      {isAdding ? (
        <div>
          <input
            name="firstname"
            placeholder="First Name"
            value={newStudentMaster.firstname}
            onChange={handleInputChange}
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={newStudentMaster.lastname}
            onChange={handleInputChange}
          />
          <input
            name="roleno"
            placeholder="Role No"
            value={newStudentMaster.roleno}
            onChange={handleInputChange}
          />
          <input
            name="subjectname"
            placeholder="Subject Name"
            value={newStudentMaster.subjectname}
            onChange={handleInputChange}
          />
          <input
            name="staffname"
            placeholder="Staff Name"
            value={newStudentMaster.staffname}
            onChange={handleInputChange}
          />
          <input
            name="subjectcode"
            placeholder="Subject Code"
            value={newStudentMaster.subjectcode}
            onChange={handleInputChange}
          />
          <button onClick={handleAddStudentMaster}>Submit</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Student Master</button>
      )}
      <Table
        columns={[
          "First Name",
          "Last Name",
          "Role No",
          "Subject Name",
          "Staff Name",
          "Subject Code",
        ]}
        data={studentMasters}
        onDelete={handleDeleteStudentMaster}
      />
    </div>
  );
};

export default StudentMasterPage;
