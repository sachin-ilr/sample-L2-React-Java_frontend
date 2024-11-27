import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData } from "../service/api";
import Table from "../components/Table"; // Import the Table component

const SubjectPage = () => {
  const [subjectsData, setSubjectsData] = useState([]);

  useEffect(() => {
    fetchData("subjects")
      .then((response) => setSubjectsData(response))
      .catch((error) => console.log("Error fetching subjects data:", error));
  }, []);

  const handleDelete = (id) => {
    deleteData("subjects", id)
      .then(() =>
        setSubjectsData(subjectsData.filter((subject) => subject.id !== id))
      )
      .catch((error) => console.log("Error deleting subject:", error));
  };

  return (
    <div>
      <h2>Subject Page</h2>
      <Table
        data={subjectsData}
        columns={["Subject Name", "Staff Name", "Subject Code"]}
        handleDelete={handleDelete}
        handleUpdate={updateData}
      />
    </div>
  );
};

export default SubjectPage;
