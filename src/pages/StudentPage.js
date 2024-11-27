import React, { useState, useEffect } from "react";
import Table from "../components/table";
import { fetchData, postData, deleteData } from "../service/api";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstname: "",
    lastname: "",
    mobileno: "",
    roleno: "",
    classname: "",
    address: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const fetchStudents = () => {
    fetchData("http://localhost:8080/api/students/all")
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = () => {
    postData("/api/students", newStudent)
      .then(() => {
        fetchStudents();
        setNewStudent({
          firstname: "",
          lastname: "",
          mobileno: "",
          roleno: "",
          classname: "",
          address: "",
        });
        setIsAdding(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteStudent = (id) => {
    deleteData(`/api/students/${id}`)
      .then(() => fetchStudents())
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Students</h2>
      {isAdding ? (
        <div>
          <input
            name="firstname"
            placeholder="First Name"
            value={newStudent.firstname}
            onChange={handleInputChange}
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={newStudent.lastname}
            onChange={handleInputChange}
          />
          <input
            name="mobileno"
            placeholder="Mobile No"
            value={newStudent.mobileno}
            onChange={handleInputChange}
          />
          <input
            name="roleno"
            placeholder="Role No"
            value={newStudent.roleno}
            onChange={handleInputChange}
          />
          <input
            name="classname"
            placeholder="Class Name"
            value={newStudent.classname}
            onChange={handleInputChange}
          />
          <input
            name="address"
            placeholder="Address"
            value={newStudent.address}
            onChange={handleInputChange}
          />
          <button onClick={handleAddStudent}>Submit</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Student</button>
      )}
      <Table
        columns={[
          "First Name",
          "Last Name",
          "Mobile No",
          "Role No",
          "Class Name",
          "Address",
        ]}
        data={students}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentPage;
