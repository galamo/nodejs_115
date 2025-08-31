import * as React from "react";
import { format, compareAsc } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
const expenseTest = {
  id: 75,
  amount: "245.00",
  date: "2025-06-08T14:22:00.000Z",
  category: "Supplies",
  description: "Office paper",
};
type Expense = typeof expenseTest;
// Example: pass data as props
export default function DataTable({ rows }: { rows: Array<Expense> }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Amount ($)</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>

              {/* <TableCell>{new Date(row.date).toISOString()}</TableCell> */}
              <TableCell>
                {format(new Date(row.date), "dd/MMM/yy HH:mm:ss")}
              </TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
