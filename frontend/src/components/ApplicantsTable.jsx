import { useState, useEffect } from "react";
import { useNavigate } from "../router";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Chip, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination, 
  TableRow,
  Typography
} from "@mui/material";
const columns = [
  {
    id: "fname",
    label: "Name",
    minWidth: 0,
    format: (value) => value,
  },
  {
    id: 'lname', 
    label: "Last Name", 
    format: (value) => value,
  },
  {
    id: "dept",
    label: "Department",
    minWidth: 100,
    format: (value) => value,
  },
];

export default function ApplicantsTable({ roleListing, roleListingApplications, skills }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const navigate = useNavigate();
  const roleApplications = roleListingApplications['role_applications']
  const skillsRequired = roleListing['skills']

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewClicked = (id) => {
    navigate("/staff/:id", { params: { id: id.toString() } });
  };
  return (
    <Box sx={{maxWidth: "1000px", margin: 'auto'}}>
      <Typography variant="h4" sx={{marginBottom:2}}>Applicants</Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="right">Applicant Skills</TableCell>
                <TableCell align="right">View Applicant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roleApplications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.role_listing_id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {(column.format && typeof value === "object") ||
                            typeof value === "string"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="right">
                        {row.skills.map((skill) => {
                          console.log(skills)
                          const skill_name = skills.find((s) => s.skill_id === skill.skill_id).skill_name
                          // if (skillsRequired.includes(skill_name)) {
                          //   return (
                          //     <Chip label={skill_name} color="secondary" />
                          //   );
                          // } else {
                            return (
                              <Chip label={skill_name}/>
                            );
                          // }
                        })}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleViewClicked(row.staff_id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={roleApplications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
