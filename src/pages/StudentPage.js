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

const StudentPage = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    roleNo: "",
    className: "",
    address: "",
  });

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData("students");
      setStudentsData(data.content);
      setError(null);
    } catch (err) {
      setError("Failed to load students data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData("students", id);
      setStudentsData(studentsData.filter((student) => student.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete student. Please try again.");
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await updateData("students", id, updatedData);
      setStudentsData(
        studentsData.map((student) => (student.id === id ? response : student))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update student. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("students", formData);
      setStudentsData([...studentsData, response]);
      setFormData({
        firstName: "",
        lastName: "",
        mobileNo: "",
        roleNo: "",
        className: "",
        address: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to add student. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Student Page
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
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="Last Name"
          value={formData.lastName}
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
          required
          fullWidth
          name="roleNo"
          label="Role No."
          value={formData.roleNo}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="className"
          label="Class Name"
          value={formData.className}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Student
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Students List
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Role No.</TableCell>
                <TableCell>Class Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.mobileNo}</TableCell>
                  <TableCell>{student.roleNo}</TableCell>
                  <TableCell>{student.className}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(student.id, student)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(student.id)}>
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

export default StudentPage;
