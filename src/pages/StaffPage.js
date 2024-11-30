import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData, postData } from "../service/api";
import ReusableTable from "../components/ReusableTable";
import ReusableForm from "../components/ReusableForm";
import ErrorMessage from "../components/ErrorMessage";
import "./styles/StaffPage.css";

const StaffPage = () => {
  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    address: "",
    subject_expertise: "",
  });

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = () => {
    setIsLoading(true);
    fetchData("staff")
      .then((response) => {
        setStaffData(response);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
        setError("Failed to load staff data. Please try again later.");
        setIsLoading(false);
      });
  };

  const handleDelete = (id) => {
    deleteData("staff", id)
      .then(() => {
        setStaffData(staffData.filter((staff) => staff.id !== id));
        setError(null);
      })
      .catch((error) => {
        console.error("Error deleting staff:", error);
        setError("Failed to delete staff. Please try again.");
      });
  };

  const handleEdit = (id, updatedData) => {
    updateData("staff", id, updatedData)
      .then((response) => {
        setStaffData(
          staffData.map((staff) => (staff.id === id ? response : staff))
        );
        setError(null);
      })
      .catch((error) => {
        console.error("Error updating staff:", error);
        setError("Failed to update staff. Please try again.");
      });
  };

  const handleSubmit = (data) => {
    postData("staff", data)
      .then((response) => {
        setStaffData([...staffData, response]);
        setFormData({
          name: "",
          mobile_no: "",
          address: "",
          subject_expertise: "",
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Error adding staff:", error);
        setError("Failed to add staff. Please try again.");
      });
  };

  const formFields = [
    { name: "name", label: "Name", required: true },
    { name: "mobile_no", label: "Mobile No.", required: true },
    { name: "address", label: "Address", required: true },
    { name: "subject_expertise", label: "Subject Expertise", required: true },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Staff Page</h2>
      {error && <ErrorMessage message={error} className="error-message" />}

      <h3 className="section-title">Add New Staff</h3>
      <ReusableForm
        fields={formFields}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        submitButtonText="Add Staff"
      />

      <h3 className="section-title">Staff List</h3>
      {isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <ReusableTable
          columns={["Name", "Mobile No.", "Address", "Subject Expertise"]}
          rows={staffData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default StaffPage;
