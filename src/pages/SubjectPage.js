import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData, postData } from "../service/api";
import ReusableTable from "../components/ReusableTable";
import ReusableForm from "../components/ReusableForm";
import ErrorMessage from "../components/ErrorMessage";
import "./styles/SubjectPage.css";

const SubjectPage = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    subject_name: "",
    staff_name: "",
    subject_code: "",
  });

  useEffect(() => {
    fetchSubjectsData();
  }, []);

  const fetchSubjectsData = () => {
    setIsLoading(true);
    fetchData("subjects")
      .then((response) => {
        setSubjectsData(response);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching subjects data:", error);
        setError("Failed to load subjects data. Please try again later.");
        setIsLoading(false);
      });
  };

  const handleDelete = (id) => {
    deleteData("subjects", id)
      .then(() => {
        setSubjectsData(subjectsData.filter((subject) => subject.id !== id));
        setError(null);
      })
      .catch((error) => {
        console.error("Error deleting subject:", error);
        setError("Failed to delete subject. Please try again.");
      });
  };

  const handleEdit = (id, updatedData) => {
    updateData("subjects", id, updatedData)
      .then((response) => {
        setSubjectsData(
          subjectsData.map((subject) =>
            subject.id === id ? response : subject
          )
        );
        setError(null);
      })
      .catch((error) => {
        console.error("Error updating subject:", error);
        setError("Failed to update subject. Please try again.");
      });
  };

  const handleSubmit = (data) => {
    postData("subjects", data)
      .then((response) => {
        setSubjectsData([...subjectsData, response]);
        setFormData({
          subject_name: "",
          staff_name: "",
          subject_code: "",
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Error adding subject:", error);
        setError("Failed to add subject. Please try again.");
      });
  };

  const formFields = [
    { name: "subject_name", label: "Subject Name", required: true },
    { name: "staff_name", label: "Staff Name", required: true },
    { name: "subject_code", label: "Subject Code", required: true },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Subject Page</h2>
      {error && <ErrorMessage message={error} className="error-message" />}

      <h3 className="section-title">Add New Subject</h3>
      <ReusableForm
        fields={formFields}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        submitButtonText="Add Subject"
      />

      <h3 className="section-title">Subjects List</h3>
      {isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <ReusableTable
          columns={["Subject Name", "Staff Name", "Subject Code"]}
          rows={subjectsData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SubjectPage;
