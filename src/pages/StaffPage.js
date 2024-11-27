import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData } from "../service/api";
import Table from "../components/Table"; // Import the Table component

const StaffPage = () => {
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    fetchData("staff")
      .then((response) => setStaffData(response))
      .catch((error) => console.log("Error fetching staff data:", error));
  }, []);

  const handleDelete = (id) => {
    deleteData("staff", id)
      .then(() => setStaffData(staffData.filter((staff) => staff.id !== id)))
      .catch((error) => console.log("Error deleting staff:", error));
  };

  return (
    <div>
      <h2>Staff Page</h2>
      <Table
        data={staffData}
        columns={["Name", "Mobile No.", "Address", "Subject Expertise"]}
        handleDelete={handleDelete}
        handleUpdate={updateData}
      />
    </div>
  );
};

export default StaffPage;
