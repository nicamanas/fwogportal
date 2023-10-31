import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid } from "@mui/material";
import { RoleListingAPI } from "../../apis/rolelistingAPI";
import { useNavigate } from "../../router.js";

const columns = [
  {
    id: "role_listing_id",
    label: "Listing ID",
    minWidth: 0,
    format: (value: string) => value,
  },
  {
    id: "role_name",
    label: "Listing Name",
    minWidth: 100,
    format: (value: string) => value,
  },
  {
    id: "role_listing_desc",
    label: "Listing Description",
    minWidth: 170,
    align: "right",
    format: (value: string) => value,
  },
  {
    id: "skills",
    label: "Skills",
    minWidth: 170,
    align: "right",
    format: (values: string[]) => values.join(", "),
  },
  {
    id: "role_listing_source",
    label: "Source ID",
    minWidth: 30,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "role_listing_close",
    label: "Closing date",
    minWidth: 150,
    align: "right",
    format: (role_listing_close: string) =>
      new Date(role_listing_close).toLocaleDateString("en-SG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
  },
];

export default function AdminPanel() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleListings, setRoleListings] = useState<RoleListing[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    RoleListingAPI.getAll().then((rolelistings: RoleListing[]) => {
      setRoleListings(rolelistings);
    });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClicked = (id: number) => {
    navigate("/editlistings/edit/:id", { params: { id: id.toString() } });
  };
  return (
    <Box>
      <Grid container justifyContent="end" pb={2}>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/editlistings/create")}
          >
            Add Listing
          </Button>
        </Grid>
      </Grid>
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
                <TableCell align="right">
                  View Listing
                </TableCell>
                <TableCell key="edit" align="right" style={{ minWidth: 100 }}>
                  Edit/Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roleListings
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
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => navigate("/rolelistings/:id", { params: { id: row.role_listing_id.toString() } })}
                        >
                          View
                        </Button>
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: '120px'}}>
                        <IconButton color="primary" onClick={() => handleEditClicked(row.role_listing_id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => {}}>
                          <DeleteIcon />
                        </IconButton>
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
          count={roleListings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
