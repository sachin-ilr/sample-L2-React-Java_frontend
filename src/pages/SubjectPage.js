import React, { useState, useEffect } from "react";
import Table from "../components/table";
import { fetchData, postData, deleteData } from "../service/api";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: "", code: "" });
  const [isAdding, setIsAdding] = useState(false);

  const fetchSubjects = () => {
    fetchData("/api/subjects")
      .then((data) => setSubjects(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = () => {
    postData("/api/subjects", newSubject)
      .then(() => {
        fetchSubjects();
        setNewSubject({ name: "", code: "" });
        setIsAdding(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteSubject = (id) => {
    deleteData(`/api/subjects/${id}`)
      .then(() => fetchSubjects())
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Subject Page</h2>
      {isAdding ? (
        <div>
          <input
            name="name"
            placeholder="Subject Name"
            value={newSubject.name}
            onChange={handleInputChange}
          />
          <input
            name="code"
            placeholder="Subject Code"
            value={newSubject.code}
            onChange={handleInputChange}
          />
          <button onClick={handleAddSubject}>Submit</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Subject</button>
      )}
      <Table
        columns={["Name", "Code"]}
        data={subjects}
        onEdit={(subject) => console.log("Edit", subject)}
        onDelete={handleDeleteSubject}
      />
    </div>
  );
};

export default SubjectPage;
