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

const SubjectPage = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    staffName: "",
    subjectCode: "",
  });

  useEffect(() => {
    fetchSubjectsData();
  }, []);

  const fetchSubjectsData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData("subjects");
      setSubjectsData(data.content);
      setError(null);
    } catch (err) {
      setError("Failed to load subjects data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData("subjects", id);
      setSubjectsData(subjectsData.filter((subject) => subject.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete subject. Please try again.");
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await updateData("subjects", id, updatedData);
      setSubjectsData(
        subjectsData.map((subject) => (subject.id === id ? response : subject))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update subject. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("subjects", formData);
      setSubjectsData([...subjectsData, response]);
      setFormData({
        name: "",
        staffName: "",
        subjectCode: "",
      });
      setError(null);
    } catch (err) {
      setError("Failed to add subject. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Subject Page
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
          label="Subject Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="staffName"
          label="Staff Name"
          value={formData.staffName}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          name="subjectCode"
          label="Subject Code"
          value={formData.subjectCode}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Subject
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Subjects List
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject Name</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Subject Code</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectsData.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.staffName}</TableCell>
                  <TableCell>{subject.subjectCode}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(subject.id, subject)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(subject.id)}>
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

export default SubjectPage;
