// SkillsTable.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SkillsTable() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // Fetch the skills from your API or database
        fetch('/api/skills') 
            .then(response => response.json())
            .then(data => setSkills(data));
    }, []);

    const handleEdit = (skillId) => {
        // Handle the edit logic here
        console.log("Editing:", skillId);
    }

    const handleDelete = (skillId) => {
        // Handle the delete logic here
        console.log("Deleting:", skillId);
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="skills table">
                <TableHead>
                    <TableRow>
                        <TableCell>Skill Name</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {skills.map((skill) => (
                        <TableRow key={skill.id}>
                            <TableCell component="th" scope="row">{skill.name}</TableCell>
                            <TableCell align="right">{skill.status}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleEdit(skill.id)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(skill.id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SkillsTable;
