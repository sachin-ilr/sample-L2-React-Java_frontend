import React, { useEffect, useState } from "react";
import ReusableTable from "../components/table";
import api from "../service/api";

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    address: "",
    subjectexpert: "",
  });

  useEffect(() => {
    api
      .get("/staff")
      .then((res) => setStaff(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => setShowForm(true);

  const handleSubmit = () => {
    api
      .post("/staff", formData)
      .then(() => {
        setShowForm(false);
        setFormData({ name: "", mobileno: "", address: "", subjectexpert: "" });
        api.get("/staff").then((res) => setStaff(res.data)); // Refresh data
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Staff</h1>
      <button onClick={handleAdd}>Add Staff</button>
      {showForm && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subject Expert"
            value={formData.subjectexpert}
            onChange={(e) =>
              setFormData({ ...formData, subjectexpert: e.target.value })
            }
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      <ReusableTable
        columns={["name", "mobileno", "address", "subjectexpert"]}
        rows={staff}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => {
          api
            .delete(`/staff/${id}`)
            .then(() => api.get("/staff").then((res) => setStaff(res.data)))
            .catch((err) => console.error(err));
        }}
      />
    </div>
  );
};

export default StaffPage;
