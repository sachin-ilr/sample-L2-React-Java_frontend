import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData } from "../service/api";
import Table from "../components/Table"; // Import the Table component

const StudentPage = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    fetchData("students")
      .then((response) => setStudentsData(response))
      .catch((error) => console.log("Error fetching students data:", error));
  }, []);

  const handleDelete = (id) => {
    deleteData("students", id)
      .then(() =>
        setStudentsData(studentsData.filter((student) => student.id !== id))
      )
      .catch((error) => console.log("Error deleting student:", error));
  };

  return (
    <div>
      <h2>Student Page</h2>
      <Table
        data={studentsData}
        columns={[
          "First Name",
          "Last Name",
          "Mobile No.",
          "Role No.",
          "Class Name",
          "Address",
        ]}
        handleDelete={handleDelete}
        handleUpdate={updateData}
      />
    </div>
  );
};

export default StudentPage;
