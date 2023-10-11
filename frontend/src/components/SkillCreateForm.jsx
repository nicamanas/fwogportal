//Create a form to add a new skill
// Path: frontend/src/components/SkillCreateForm.jsx
// Refer to role listing form for reference

import React, { useState} from 'react';
import {Box, Button, InputLabel, FormControl, MenuItem, Select, Snackbar, TextField, Container, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

function SkillCreateForm() {
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
            const response = await fetch("linkhere", { //TODO: Add link here
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSkill)
            });
            
            const responseData = await response.json();

            if (!response.ok) {
                console.error("Error posting data with status:", response.status, responseData);
                setSnackBarMsg("Error creating skill");
                setOpenSnackbar(true);
            } else { 
                setSnackBarMsg("Skill created!");
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
        <Container maxWidth="md" sx={{backgroundColor:'white', mt: 7, p: 1}}>
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

            <Typography variant="h3" sx={{textAlign: 'center', my: 3}}>
                <img src="src/assets/pepe.png" alt="Pepe" width="50px" height="50px"/>
                Create a new skill
            </Typography>

            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            required
                            name="skill_name"
                            label="Skill Name"
                            fullWidth
                            rows={3}
                            value={formData.role_listing_desc}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{m: 1}}>
                        <InputLabel id="skill_status">Skill Status</InputLabel>
                        <Select name="skill_status" labelId="skill_status" id="skill_status" value={formData.skill_status} onChange={handleInputChange} label="Skill Status">
                            <MenuItem value="available">Available</MenuItem>
                            <MenuItem value="unavailable">Unavailable</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{m:2}}>
                        <Button type="submit" size="large" variant="contained" sx={{backgroundColor:"#7d86d9", padding:1}} disableElevation>
                            Create Skill
                        </Button>
                    </FormControl>
                </Box>
            </form>
        </Container>
    );
}

export default SkillCreateForm;