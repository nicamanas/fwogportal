import { useEffect, useState } from 'react';
import {Box, Button, Container} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { RoleApplicationAPI } from '../../apis/roleApplicationAPI';
import { RoleListingAPI } from '../../apis/rolelistingAPI';
import { useNavigate } from '../../router.ts';

const columns = [
  { id: 'role_app_id', label: 'Application ID', align: 'center'},
  { id: 'role_name', label: 'Role Name', align: 'center'},
  { id: 'role_app_status', label: 'Application Status', align: 'center' },
];

function StaffApplications() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [applications, setApplications] = useState([]);
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        RoleListingAPI.getAll().then((fetchedListings) => {
            setListings(fetchedListings)
        });
      RoleApplicationAPI.getall().then((fetchedApplications) => {
        setApplications(fetchedApplications)
    });
       
    }, []);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const handleWithdraw = (id) => {
        console.log(id)
      //navigate("/skillcatalogue/edit/:id", { params: { id: id.toString() } }); // Adjust this route to your needs
    }

  return (
    <Container maxWidth="md" sx={{backgroundColor: "white", mt: 7, p:3}}>
      <TableContainer sx={{backgroundColor: "white"}}>
        <Table stickyHeader aria-label="sticky table" sx={{backgroundColor: "white"}}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'center'}
                  sx={{ 
                    fontWeight: 'bold',
                    borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ 
                fontWeight: 'bold',
                borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
              }}>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((application) => {
                return (
                  <TableRow 
                    hover 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={application.role_app_id} 
                    sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                  >
                    {columns.map((column) => {
                        let value;
                      if (column.id == 'role_name') {
                        value = listings.find((listing) => listing.role_listing_id == application.role_listing_id).role_name;
                      } else {
                        value = application[column.id];
                      }
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <Button variant="contained" onClick={() => handleWithdraw(application.role_app_id)}>
                        Withdraw
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
        count={applications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default StaffApplications;