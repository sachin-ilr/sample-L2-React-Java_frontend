import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData, postData } from "../service/api";
import ReusableTable from "../components/ReusableTable";
import ReusableForm from "../components/ReusableForm";
import ErrorMessage from "../components/ErrorMessage";
import "./styles/StudentPage.css";

const StudentPage = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_no: "",
    role_no: "",
    class_name: "",
    address: "",
  });

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = () => {
    setIsLoading(true);
    fetchData("students")
      .then((response) => {
        setStudentsData(response);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching students data:", error);
        setError("Failed to load students data. Please try again later.");
        setIsLoading(false);
      });
  };

  const handleDelete = (id) => {
    deleteData("students", id)
      .then(() => {
        setStudentsData(studentsData.filter((student) => student.id !== id));
        setError(null);
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        setError("Failed to delete student. Please try again.");
      });
  };

  const handleEdit = (id, updatedData) => {
    updateData("students", id, updatedData)
      .then((response) => {
        setStudentsData(
          studentsData.map((student) =>
            student.id === id ? response : student
          )
        );
        setError(null);
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        setError("Failed to update student. Please try again.");
      });
  };

  const handleSubmit = (data) => {
    postData("students", data)
      .then((response) => {
        setStudentsData([...studentsData, response]);
        setFormData({
          first_name: "",
          last_name: "",
          mobile_no: "",
          role_no: "",
          class_name: "",
          address: "",
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        setError("Failed to add student. Please try again.");
      });
  };

  const formFields = [
    { name: "first_name", label: "First Name", required: true },
    { name: "last_name", label: "Last Name", required: true },
    { name: "mobile_no", label: "Mobile No.", required: true },
    { name: "role_no", label: "Role No.", required: true },
    { name: "class_name", label: "Class Name", required: true },
    { name: "address", label: "Address", required: true },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Student Page</h2>
      {error && <ErrorMessage message={error} className="error-message" />}

      <h3 className="section-title">Add New Student</h3>
      <ReusableForm
        fields={formFields}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        submitButtonText="Add Student"
      />

      <h3 className="section-title">Students List</h3>
      {isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <ReusableTable
          columns={[
            "First Name",
            "Last Name",
            "Mobile No.",
            "Role No.",
            "Class Name",
            "Address",
          ]}
          rows={studentsData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default StudentPage;
