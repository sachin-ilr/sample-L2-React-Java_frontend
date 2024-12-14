import React, { useEffect, useState } from "react";
import { fetchData, postData, updateData, deleteData } from "../service/api";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("staff", formData);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Staff Page
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="mobileNo"
          label="Mobile No."
          value={formData.mobileNo}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="subjectExpert"
          label="Subject Expertise"
          value={formData.subjectExpert}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Staff
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Staff List
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Subject Expertise</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffData.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.mobileNo}</TableCell>
                  <TableCell>{staff.address}</TableCell>
                  <TableCell>{staff.subjectExpert}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(staff.id, staff)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(staff.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default StaffPage;
