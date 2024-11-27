import React, { useEffect, useState } from "react";
import ReusableTable from "../components/table";
import api from "../service/api";

const StudentMasterPage = () => {
  const [studentMasters, setStudentMasters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    roleno: "",
    subjectname: "",
    staffname: "",
    subjectcode: "",
  });

  useEffect(() => {
    api
      .get("/student-master")
      .then((res) => setStudentMasters(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => setShowForm(true);

  const handleSubmit = () => {
    api
      .post("/student-master", formData)
      .then(() => {
        setShowForm(false);
        setFormData({
          firstname: "",
          lastname: "",
          roleno: "",
          subjectname: "",
          staffname: "",
          subjectcode: "",
        });
        api.get("/student-master").then((res) => setStudentMasters(res.data)); // Refresh data
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Student Master</h1>
      <button onClick={handleAdd}>Add Record</button>
      {showForm && (
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Role No"
            value={formData.roleno}
            onChange={(e) =>
              setFormData({ ...formData, roleno: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subject Name"
            value={formData.subjectname}
            onChange={(e) =>
              setFormData({ ...formData, subjectname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Staff Name"
            value={formData.staffname}
            onChange={(e) =>
              setFormData({ ...formData, staffname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subject Code"
            value={formData.subjectcode}
            onChange={(e) =>
              setFormData({ ...formData, subjectcode: e.target.value })
            }
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <ReusableTable
        columns={[
          "firstname",
          "lastname",
          "roleno",
          "subjectname",
          "staffname",
          "subjectcode",
        ]}
        rows={studentMasters}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => {
          api
            .delete(`/student-master/${id}`)
            .then(() =>
              api
                .get("/student-master")
                .then((res) => setStudentMasters(res.data))
            )
            .catch((err) => console.error(err));
        }}
      />
    </div>
  );
};

export default StudentMasterPage;
