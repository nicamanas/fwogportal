import React, { useState, useEffect} from 'react';
import {Box, Button, InputLabel, FormControl, MenuItem, Select, Snackbar, TextField, Container, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from '../router';
import { SBRPSkillsAPI } from '../apis/sbrpSkillsAPI';

function EditSkillForm({skill}) {
    const { skill_id, skill_name, skill_status } = skill;

    const navigate = useNavigate();

    const initialFormData = {
        skill_id,
        skill_name,
        skill_status
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

        const skill = {
            ...formData,
            skill_id: generateId()
        }

        console.log(skill);

        SBRPSkillsAPI.update(skill_id, skill)
            .then((fetchedSkill) => {
                console.log(fetchedSkill);
                setFormData(fetchedSkill);
                setSnackBarMsg("Skill updated!");
                setOpenSnackbar(true);
                setTimeout(() => {
                  navigate("/skillcatalogue")
                }, 1500)
            })
            .catch((error) => {
                console.error("Error updating skill: ", error);
                setSnackBarMsg("Error updating skill");
                setOpenSnackbar(true);
            });
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
        <Container maxWidth="md" sx={{mt: 7, p: 1}}>
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
                Edit Skill
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
                            value={formData.skill_name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{m: 1}}>
                        <InputLabel id="skill_status">Skill Status</InputLabel>
                        <Select name="skill_status" labelId="skill_status" id="skill_status" value={formData.skill_status} onChange={handleInputChange} label="Skill Status">
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{m:2}}>
                        <Button type="submit" size="large" variant="contained" sx={{padding:1}} disableElevation>
                            Edit Skill
                        </Button>
                    </FormControl>
                </Box>
            </form>
        </Container>
    );
}

export default EditSkillForm;