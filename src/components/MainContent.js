import React, { useState, useEffect } from "react";
import { fetchData, postData } from "../service/api";

const MainContent = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");

  useEffect(() => {
    // Fetch students when the component mounts
    fetchData("/api/students")
      .then((data) => setStudents(data))
      .catch((err) => console.error("Failed to fetch students", err));
  }, []);

  const handleAddStudent = () => {
    const student = { name: newStudent };

    postData("/api/students", student)
      .then((data) => setStudents((prev) => [...prev, data]))
      .catch((err) => console.error("Failed to add student", err));
  };

  return (
    <main>
      <h2>Students List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Student"
        value={newStudent}
        onChange={(e) => setNewStudent(e.target.value)}
      />
      <button onClick={handleAddStudent}>Add Student</button>
    </main>
  );
};

export default MainContent;
