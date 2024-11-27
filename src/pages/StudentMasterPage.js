import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData } from "../service/api";
import Table from "../components/Table"; // Import the Table component

const StudentMasterPage = () => {
  const [studentsMasterData, setStudentsMasterData] = useState([]);

  useEffect(() => {
    fetchData("student_master")
      .then((response) => setStudentsMasterData(response))
      .catch((error) =>
        console.log("Error fetching student master data:", error)
      );
  }, []);

  const handleDelete = (id) => {
    deleteData("student_master", id)
      .then(() =>
        setStudentsMasterData(
          studentsMasterData.filter((student) => student.id !== id)
        )
      )
      .catch((error) => console.log("Error deleting student master:", error));
  };

  return (
    <div>
      <h2>Student Master Page</h2>
      <Table
        data={studentsMasterData}
        columns={[
          "First Name",
          "Last Name",
          "Role No.",
          "Subject Name",
          "Staff Name",
        ]}
        handleDelete={handleDelete}
        handleUpdate={updateData}
      />
    </div>
  );
};

export default StudentMasterPage;
