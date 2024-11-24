import React, { useState, useEffect } from "react";
import Table from "../components/table";
import { fetchData, postData, deleteData } from "../service/api";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    grade: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const fetchStudents = () => {
    fetchData("/api/students")
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
        setNewStudent({ name: "", age: "", grade: "" });
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
      <h2>Student Page</h2>
      {isAdding ? (
        <div>
          <input
            name="name"
            placeholder="Name"
            value={newStudent.name}
            onChange={handleInputChange}
          />
          <input
            name="age"
            placeholder="Age"
            value={newStudent.age}
            onChange={handleInputChange}
          />
          <input
            name="grade"
            placeholder="Grade"
            value={newStudent.grade}
            onChange={handleInputChange}
          />
          <button onClick={handleAddStudent}>Submit</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Student</button>
      )}
      <Table
        columns={["Name", "Age", "Grade"]}
        data={students}
        onEdit={(student) => console.log("Edit", student)}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentPage;
