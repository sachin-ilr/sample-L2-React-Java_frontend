import React, { useEffect, useState } from "react";
import { fetchData, postData, updateData, deleteData } from "../service/api";
import ReusableTable from "../components/ReusableTable";
import ReusableForm from "../components/ReusableForm";
import ErrorMessage from "../components/ErrorMessage";
import "./styles/SubjectPage.css";

const SubjectPage = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    staffName: "",
    subjectCode: "",
  });

  useEffect(() => {
    fetchSubjectsData();
  }, []);

  const fetchSubjectsData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData("subjects");
      setSubjectsData(data.content);
      setError(null);
    } catch (err) {
      setError("Failed to load subjects data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData("subjects", id);
      setSubjectsData(subjectsData.filter((subject) => subject.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete subject. Please try again.");
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await updateData("subjects", id, updatedData);
      setSubjectsData(
        subjectsData.map((subject) => (subject.id === id ? response : subject))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update subject. Please try again.");
    }
  };

  const handleSubmit = async (data) => {
    try {
      const response = await postData("subjects", data);
      setSubjectsData([...subjectsData, response]);
      setFormData({
        name: "",
        staffName: "",
        subjectCode: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to add subject. Please try again.");
    }
  };

  const formFields = [
    { name: "name", label: "Subject Name", required: true },
    { name: "staffName", label: "Staff Name", required: true },
    { name: "subjectCode", label: "Subject Code", required: false },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Subject Page</h2>
      {error && <ErrorMessage message={error} />}

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
