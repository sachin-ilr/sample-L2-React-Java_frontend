import React, { useEffect, useState } from "react";
import { fetchData, deleteData, updateData } from "../service/api";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";

const StudentMasterPage = () => {
  const [studentsMasterData, setStudentsMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentMasterData();
  }, []);

  const fetchStudentMasterData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData("student-master");
      setStudentsMasterData(data.content);
      setError(null);
    } catch (err) {
      console.error("Error fetching student master data:", err);
      setError("Failed to load student master data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteData("student-master", id);
      setStudentsMasterData(
        studentsMasterData.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Error deleting student master:", error);
      setError("Failed to delete student master. Please try again.");
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await updateData("student-master", id, updatedData);
      setStudentsMasterData(
        studentsMasterData.map((student) =>
          student.id === id ? response : student
        )
      );
    } catch (error) {
      console.error("Error updating student master:", error);
      setError("Failed to update student master. Please try again.");
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Student Master Page
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role No.</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Staff Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsMasterData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.roleNo}</TableCell>
                <TableCell>{student.subjectName}</TableCell>
                <TableCell>{student.staffName}</TableCell>
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
    </Container>
  );
};

export default StudentMasterPage;
