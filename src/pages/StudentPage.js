import React, { useEffect, useState } from "react";
import { fetchData, postData, updateData, deleteData } from "../service/api";
import ReusableTable from "../components/ReusableTable";
import ReusableForm from "../components/ReusableForm";
import ErrorMessage from "../components/ErrorMessage";
import "./styles/StudentPage.css";

const StudentPage = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    roleNo: "",
    className: "",
    address: "",
  });

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData("students");
      setStudentsData(data.content); // Assuming the API returns paginated data
      setError(null);
    } catch (err) {
      setError("Failed to load students data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData("students", id);
      setStudentsData(studentsData.filter((student) => student.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete student. Please try again.");
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await updateData("students", id, updatedData);
      setStudentsData(
        studentsData.map((student) => (student.id === id ? response : student))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update student. Please try again.");
    }
  };

  const handleSubmit = async (data) => {
    try {
      const response = await postData("students", data);
      setStudentsData([...studentsData, response]);
      setFormData({
        firstName: "",
        lastName: "",
        mobileNo: "",
        roleNo: "",
        className: "",
        address: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to add student. Please try again.");
    }
  };

  const formFields = [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "mobileNo", label: "Mobile No.", required: true },
    { name: "roleNo", label: "Role No.", required: true },
    { name: "className", label: "Class Name", required: true },
    { name: "address", label: "Address", required: true },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Student Page</h2>
      {error && <ErrorMessage message={error} />}

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
