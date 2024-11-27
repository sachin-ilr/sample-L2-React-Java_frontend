import React, { useEffect, useState } from "react";
import ReusableTable from "../components/table";
import api from "../service/api";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    staffname: "",
    subjectcode: "",
  });
  const [error, setError] = useState(null);

  const fetchSubjects = () => {
    api
      .get("/subjects")
      .then((res) => setSubjects(res.data))
      .catch((err) => setError("Failed to fetch subjects"));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = () => setShowForm(true);

  const validateForm = () => {
    return (
      formData.name.trim() &&
      formData.staffname.trim() &&
      formData.subjectcode.trim()
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      setError("Please fill in all fields");
      return;
    }

    api
      .post("/subjects", formData)
      .then(() => {
        setShowForm(false);
        setFormData({ name: "", staffname: "", subjectcode: "" });
        fetchSubjects();
        setError(null);
      })
      .catch((err) => setError("Failed to add subject"));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  return (
    <div className="subject-page">
      <h1>Subjects</h1>

      {error && <div className="error-message">{error}</div>}

      <button onClick={handleAdd}>Add Subject</button>

      {showForm && (
        <div className="subject-form">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Staff Name"
            value={formData.staffname}
            onChange={(e) => handleInputChange("staffname", e.target.value)}
          />
          <input
            type="text"
            placeholder="Subject Code"
            value={formData.subjectcode}
            onChange={(e) => handleInputChange("subjectcode", e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      <ReusableTable
        columns={["name", "staffname", "subjectcode"]}
        rows={subjects}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => {
          api
            .delete(`/subjects/${id}`)
            .then(() => fetchSubjects())
            .catch((err) => setError("Failed to delete subject"));
        }}
      />
    </div>
  );
};

export default SubjectPage;
