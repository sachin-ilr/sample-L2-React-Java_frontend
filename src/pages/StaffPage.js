import React, { useEffect, useState } from "react";
import { fetchData, postData, updateData, deleteData } from "../service/api";
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
    mobileNo: "",
    address: "",
    subjectExpert: "",
  });

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData("staff");
      setStaffData(data.content);
      setError(null);
    } catch (err) {
      setError("Failed to load staff data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData("staff", id);
      setStaffData(staffData.filter((staff) => staff.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete staff. Please try again.");
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await updateData("staff", id, updatedData);
      setStaffData(
        staffData.map((staff) => (staff.id === id ? response : staff))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update staff. Please try again.");
    }
  };

  const handleSubmit = async (data) => {
    try {
      const response = await postData("staff", data);
      setStaffData([...staffData, response]);
      setFormData({
        name: "",
        mobileNo: "",
        address: "",
        subjectExpert: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to add staff. Please try again.");
    }
  };

  const formFields = [
    { name: "name", label: "Name", required: true },
    { name: "mobileNo", label: "Mobile No.", required: true },
    { name: "address", label: "Address", required: false },
    { name: "subjectExpert", label: "Subject Expertise", required: true },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Staff Page</h2>
      {error && <ErrorMessage message={error} />}

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
