import React, { useEffect, useState } from "react";
import ReusableTable from "../components/table";
import api from "../service/api";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobileno: "",
    roleno: "",
    classname: "",
    address: "",
  });

  useEffect(() => {
    api
      .get("/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => setShowForm(true);

  const handleSubmit = () => {
    api
      .post("/students", formData)
      .then(() => {
        setShowForm(false);
        setFormData({
          firstname: "",
          lastname: "",
          mobileno: "",
          roleno: "",
          classname: "",
          address: "",
        });
        api.get("/students").then((res) => setStudents(res.data)); // Refresh data
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Students</h1>
      <button onClick={handleAdd}>Add Student</button>
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
            placeholder="Mobile No"
            value={formData.mobileno}
            onChange={(e) =>
              setFormData({ ...formData, mobileno: e.target.value })
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
            placeholder="Class Name"
            value={formData.classname}
            onChange={(e) =>
              setFormData({ ...formData, classname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <ReusableTable
        columns={[
          "firstname",
          "lastname",
          "mobileno",
          "roleno",
          "classname",
          "address",
        ]}
        rows={students}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => {
          api
            .delete(`/students/${id}`)
            .then(() =>
              api.get("/students").then((res) => setStudents(res.data))
            )
            .catch((err) => console.error(err));
        }}
      />
    </div>
  );
};

export default StudentPage;
