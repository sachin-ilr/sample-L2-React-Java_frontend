import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const ReusableTable = ({ columns, rows, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col, index) => (
            <TableCell key={index}>{col}</TableCell>
          ))}
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((col, index) => (
              <TableCell key={index}>{row[col]}</TableCell>
            ))}
            <TableCell>
              <Button onClick={() => onEdit(row.id)}>Edit</Button>
              <Button onClick={() => onDelete(row.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReusableTable;
