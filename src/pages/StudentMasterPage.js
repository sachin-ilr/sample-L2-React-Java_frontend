import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData } from "../service/api";
import ReusableTable from "../components/ReusableTable";
import ErrorMessage from "../components/ErrorMessage";

const StudentMasterPage = () => {
  const [studentsMasterData, setStudentsMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchData("student_master")
      .then((response) => {
        setStudentsMasterData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student master data:", error);
        setError("Failed to load student master data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteData("student_master", id)
      .then(() => {
        setStudentsMasterData(
          studentsMasterData.filter((student) => student.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting student master:", error);
        setError("Failed to delete student master. Please try again.");
      });
  };

  const handleEdit = (id, updatedData) => {
    updateData("student_master", id, updatedData)
      .then((response) => {
        setStudentsMasterData(
          studentsMasterData.map((student) =>
            student.id === id ? response : student
          )
        );
      })
      .catch((error) => {
        console.error("Error updating student master:", error);
        setError("Failed to update student master. Please try again.");
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2>Student Master Page</h2>
      <ReusableTable
        columns={[
          "First Name",
          "Last Name",
          "Role No.",
          "Subject Name",
          "Staff Name",
        ]}
        rows={studentsMasterData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentMasterPage;
