import React, { useState} from 'react';
import {Box, Button, InputLabel, FormControl, MenuItem, Select, Snackbar, TextField, Container, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

function AddProfileSkillForm( { allSkills }) {
    const initialFormData = {
        skill_name: "",
        skill_status: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const generateId = () => Math.floor(Math.random() * 1000000000);

        const newSkill = {
            ...formData,
            skill_id: generateId()
        }

        console.log(newSkill);

        try {
            const response = await fetch("http://localhost:8003/skill_details", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSkill)
            });
            
            const responseData = await response.json();

            if (!response.ok) {
                console.error("Error posting data with status:", response.status, responseData);
                setSnackBarMsg("Error adding skill");
                setOpenSnackbar(true);
            } else { 
                setSnackBarMsg("Added skill successfully!");
                setFormData(initialFormData);
                setOpenSnackbar(true);
            }
            
        } catch (error) {
            console.error("Error creating skill: ", error);
        }

    }

    const [snackbarMsg, setSnackBarMsg] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md" sx={{mt: 2, p: 1}}>
            <div style={{ position: 'relative', height: '40px' }}>
            <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            style={{ position: "absolute", top: "35px", left: "50%", transform: "translateX(-50%)"}}>
                <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                sx={{ width: '100%' }}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
            </div>

            <Typography variant="h4" sx={{textAlign: 'center', my: 3}}>
                Add a new skill to your profile
            </Typography>

            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel id="skill_name">Skill Name</InputLabel>
                        <Select name="skill_status" labelId="skill_status" id="skill_status" value={formData.skill_status} onChange={handleInputChange} label="Skill Status">
                          {
                            allSkills.map((skill) => <MenuItem value={skill.skill_id}>{skill.skill_name}</MenuItem>)
                          }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{m:2}}>
                        <Button type="submit" size="large" variant="contained" sx={{ padding:1}} disableElevation>
                            Add Skill
                        </Button>
                    </FormControl>
                </Box>
            </form>
        </Container>
    );
}

export default AddProfileSkillForm;