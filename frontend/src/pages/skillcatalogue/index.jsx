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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SkillsAPI } from '../../apis/skillsreplicaAPI';
import { useNavigate } from '../../router.ts';

const columns = [
  { id: 'skill_id', label: 'Skill ID', align: 'center'},
  { id: 'skill_name', label: 'Skill Name', align: 'center'},
  { id: 'skill_status', label: 'Skill Status', align: 'center' },
];

function SkillsPanel() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [skills, setSkills] = useState([]); 
    const navigate = useNavigate();
  
    useEffect(() => {
      SkillsAPI.getAll().then((fetchedSkills) => {
        setSkills(fetchedSkills);
        console.log(fetchedSkills)
      });
    }, []);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const handleEditClicked = (id) => {
      navigate("/admin/editSkill/:id", { params: { id: id.toString() } }); // Adjust this route to your needs
    }
  
    const handleDeleteClicked = (id) => {
      // Implement the delete functionality here
      // For instance: call an API endpoint to delete the skill with the given id
      // and then update your local state (skills) if the API call was successful
    }

    const handleAddSkill = () => {
        navigate("/createskill");
    }

  return (
    <Container maxWidth="md" sx={{backgroundColor: "white", mt: 7, p:3}}>
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button
        variant="contained"
        sx={{padding:1}} 
        disableElevation
        startIcon={<AddIcon />}
        onClick={handleAddSkill}
      >
        Add Skill
      </Button>
      </Box>
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
            {skills
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((skill) => {
                return (
                  <TableRow 
                    hover 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={skill.skill_id} 
                    sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                  >
                    {columns.map((column) => {
                      const value = skill[column.id];
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEditClicked(skill.skill_id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClicked(skill.skill_id)}>
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
        count={skills.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default SkillsPanel;