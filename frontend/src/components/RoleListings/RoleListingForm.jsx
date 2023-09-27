import React, { useState , useEffect} from 'react';
import { Box, Button, InputLabel, FormControl, MenuItem, Select, TextField, Grid, Container, Typography } from '@mui/material';

function RoleListingForm() {

    const [formData, setFormData] = useState({
        role_id: '',
        role_listing_desc: '',
        role_listing_source: '',
        role_listing_open: new Date().toISOString().slice(0, 10),
        role_listing_close: new Date(Date.now() + 12096e5).toISOString().slice(0, 10), // default to two weeks later
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Call the API to save the new role listing or any other logic
    }

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetch('/api/roles')  // TODO: Adjust URL according to backend API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRoles(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error.message);
            });
    }, []); 

    return (
        <Container maxWidth="md" sx={{backgroundColor:'white', mt: 7, p: 1}}>
            <Typography variant="h3" sx={{ textAlign: 'center', my:3}}>
                <img src="src/assets/pepe.png" alt="Pepe" width="50px" height="50px"/>
                Create New Role Listing
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} noValidate autoComplete="off">
                    <FormControl fullWidth sx={{m: 1}}>
                        <InputLabel id="role_id">Role name</InputLabel>
                        <Select
                            required
                            labelId="role_id"
                            id="role_id"
                            value={formData.role_id}
                            label="Role"
                            onChange={handleInputChange}>
                            <MenuItem value={"Test1"}>Scum master</MenuItem>
                            <MenuItem value={"Test2"}>Code monkey</MenuItem>
                        </Select>
                        {/* Code for dynamic stuffers
                        <Select
                            required
                            labelId="role_id"
                            id="role_id"
                            value={formData.role_listing_id}
                            label="Role"
                            onChange={handleInputChange}
                        >
                            {roles.map(role => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                            */}
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            required
                            name="role_listing_desc"
                            label="Role Listing Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.role_listing_desc}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 , minWidth: 200 }}>
                        <TextField
                            required
                            name="role_listing_open"
                            label="Open Date"
                            type="date"
                            fullWidth
                            value={formData.role_listing_open}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{m:1, minWidth: 200 }}>
                        <TextField
                            required
                            name="role_listing_close"
                            label="Close Date"
                            type="date"
                            fullWidth
                            value={formData.role_listing_close}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 800 }}>
                        <TextField
                            required
                            name="role_listing_source"
                            label="Role Listing Source"
                            value={formData.role_listing_source}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{m:2}}>
                        <Button type="submit" size="large" variant="contained" sx={{backgroundColor:"#7d86d9", padding:1}} disableElevation>
                                Submit
                        </Button>
                    </FormControl>
                </Box>
            </form>
            </Container>
    );
}

export default RoleListingForm;
