import React, { useState , useEffect} from 'react';
import {Box, Button, InputLabel, FormControl, MenuItem, Select, Snackbar, TextField, Container, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from '../router';

function RoleListingForm() {
    const navigate = useNavigate();
    const initialFormData = {
        role_id: "",
        role_listing_desc: "",
        role_listing_source: "",
        role_listing_open: new Date().toISOString().slice(0, 10),
        role_listing_close: new Date(Date.now() + 12096e5).toISOString().slice(0, 10), // default to two weeks later
    };

    const [formData, setFormData] = useState(initialFormData);
    const [snackbarMsg, setSnackBarMsg] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "role_id") {
            setFormData(prevState => ({
                ...prevState,
                [name]: parseInt(value, 10)
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Fields needed to post
        // {
        //     "role_listing_id": 0, (TO ADD!)
        //     "role_id": 0, (FORM DATA)
        //     "role_listing_desc": "string", (FORM DATA)
        //     "role_listing_source": 0, (FORM DATA)
        //     "role_listing_open": "2023-09-28T14:47:18.231Z", (FORM DATA)
        //     "role_listing_close": "2023-09-28T14:47:18.231Z", (FORM DATA)
        //     "role_listing_creator": 0, (TO ADD!)
        //     "role_listing_updater": 0
        // }
        formData.role_listing_open = `${formData.role_listing_open}T00:00:00.000Z`;
        formData.role_listing_close = `${formData.role_listing_close}T00:00:00.000Z`;
        
        const generateId = () => Math.floor(Math.random() * 1000000);  

        // Add additional data
        const roleListing = {
            ...formData,
            role_listing_id: generateId(), // TODO: Check what kind of role listing is needed
            role_listing_creator: 2 //TODO: Get the staff ID of the user who is logged in
        };

        console.log(roleListing);

        try {
            const response = await fetch("http://localhost:8003/rolelistings/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(roleListing)
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.error("Error posting data with status:", response.status, responseData);
                setSnackBarMsg("Error creating role listing!");
            } else {
                setSnackBarMsg("Role listing created! Bringing you there...")
                setFormData(initialFormData); 
                setTimeout(() => {
                  navigate("/rolelistings/:id", { params: { id: responseData.role_listing_id } });
                }, 1500)
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    }

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8003/ljps/role_details/")  
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
          <CustomSnackbar
            openSnackbar={openSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
            snackbarMsg={snackbarMsg}
          />

            <Typography variant="h3" sx={{ textAlign: 'center', my:3}}>
                <img src="src/assets/pepe.png" alt="Pepe" width="50px" height="50px"/>
                Create New Role Listing
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} noValidate autoComplete="off">
                    <FormControl fullWidth sx={{m: 1}}>
                        <InputLabel id="role_id">Role name</InputLabel>
                        <Select
                            name="role_id"
                            required
                            labelId="role_id"
                            id="role_id"
                            value={formData.role_id}
                            label="Role"
                            onChange={handleInputChange}
                        >
                            {roles.map(role => (
                                <MenuItem key={role.role_id} value={role.role_id}>
                                    {role.role_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
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
                            placeholder="Enter the staff ID of the person who shared this role listing"
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
