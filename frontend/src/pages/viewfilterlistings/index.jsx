import React from 'react';
import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Chip, Container, FormControl, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { SkillListingAPI } from '../../apis/skilllistingAPI';
import { RoleListingAPI } from '../../apis/rolelistingAPI';
import RoleListingCard from '../../components/RoleListingCard';

export default function ViewFilterRoleListing() {

    const [skillListings, setSkillListings] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])

    // front-end based filtering for now
    const [roleListings, setRoleListings] = useState([])
    const [filteredRoleListings, setFilteredRoleListings] = useState([])

    useEffect(() => {
        RoleListingAPI.getAll().then((rolelistings) => {
            setRoleListings(rolelistings);
            setFilteredRoleListings(rolelistings);
        })
        SkillListingAPI.getAll().then((skillListings) => {
            setSkillListings(skillListings);
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let filteredRoles
        for (const skill of selectedSkills) {
            filteredRoles = roleListings.filter((roleListing) => {
            return roleListing.skills.includes(skill)})
        }
        setFilteredRoleListings(filteredRoles)
    }

    return (
        <Paper sx={{ flexGrow: 1 }}>
            <Container maxWidth="md" sx={{backgroundColor: 'white', mt: 7, p:1}}>
                <Typography variant="h3" sx={{ textAlign: 'center', my:3}}>
                    <img src="src/assets/pepe.png" alt="Pepe" width="50px" height="50px"/>
                    Search Role Listings by Skills
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{m: 2}}>
                        <Autocomplete 
                        multiple
                        id="skill-search-bar" 
                        freeSolo 
                        options={skillListings.map((skill_option) => skill_option.skill_name)} 
                        renderTags={(value, getTagProps) => value.map((option, index) => 
                        (<Chip variant="outlined" label={option} {...getTagProps({index})}/>))}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Select Skills"
                            placeholder="Select Skills"
                            />)}
                        onChange={(event, value) => {
                            setSelectedSkills(value)
                            setFilteredRoleListings(roleListings)
                        }}
                        />
                        <FormControl fullWidth sx={{m:2}}>
                            <Button type="submit" size="large" variant="contained" sx={{backgroundColor:"#7d86d9", padding:1}} disableElevation>
                                    Search
                            </Button>
                        </FormControl> 
                    </Stack>              
                </form>
            </Container>

            <Box sx={{ flexGrow: 1 }}>
                    {filteredRoleListings.length > 0 ? (
                        <Grid container columnSpacing={6} rowSpacing={6} sx={{p:2}}>
                        {filteredRoleListings.map((roleListing, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                        <RoleListingCard roleListing={roleListing} />
                    </Grid>
                    ))}</Grid>) : (<Container maxWidth="md" sx={{backgroundColor: 'white', mt: 7, p:1}}><Typography variant="h3" sx={{ textAlign: 'center', m:3, s:3}}>
                    No Roles Found
                    </Typography></Container>) }
            </Box>
        </Paper>
    );
}
